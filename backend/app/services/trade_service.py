from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from app.models.trade_model import Trade
from app.models.trade_pair_model import TradePair
from app.utils.enums import TradeStatus
from app.schemas.trade_schema import TradeCreate, TradeUpdate
from app.services.risk_setting_service import get_risk_settings, calculate_sl_tp
from app.services.trade_journal_service import create_trade_journal_entry, calculate_risk_reward
from app.utils.websocket_manager import manager

async def open_trade(db: Session, trade_data: TradeCreate):
    """Opens a new trade with default or user-defined SL/TP settings and sends real-time updates."""
    try:
        trade_pair = db.query(TradePair).filter(TradePair.symbol == trade_data.symbol).first()
        if not trade_pair:
            trade_pair = TradePair(symbol=trade_data.symbol, asset_type=trade_data.asset_type)
            db.add(trade_pair)
            db.commit()
            db.refresh(trade_pair)

        # Get risk settings for default SL & TP
        risk_settings = get_risk_settings(db, trade_data.user_id, trade_pair.id)
        if not trade_data.sl_price or not trade_data.tp_price:
            trade_data.sl_price, trade_data.tp_price = calculate_sl_tp(
                entry_price=trade_data.entry_price,
                action=trade_data.action,
                risk_settings=risk_settings
            )

        trade = Trade(
            user_id=trade_data.user_id,
            pair_id=trade_pair.id,
            action=trade_data.action,
            lot_size=trade_data.lot_size,
            entry_price=trade_data.entry_price,
            sl_price=trade_data.sl_price,
            tp_price=trade_data.tp_price,
            status=TradeStatus.OPEN,
            created_at=datetime.utcnow(),
        )

        db.add(trade)
        db.commit()
        db.refresh(trade)

        # Send real-time update via WebSocket
        await manager.broadcast({
            "event": "trade_opened",
            "trade_id": str(trade.id),
            "symbol": trade_data.symbol,
            "status": trade.status.value
        })

        return {"message": "Trade opened successfully", "trade_id": trade.id}
    except IntegrityError:
        db.rollback()
        return {"error": "Failed to open trade"}

async def modify_trade(db: Session, trade_id: str, trade_data: TradeUpdate):
    """Modifies an existing trade and sends real-time updates."""
    trade = db.query(Trade).filter(Trade.id == trade_id).first()
    if not trade:
        return {"error": "Trade not found"}

    trade.lot_size = trade_data.lot_size if trade_data.lot_size else trade.lot_size
    trade.entry_price = trade_data.entry_price if trade_data.entry_price else trade.entry_price
    trade.sl_price = trade_data.sl_price if trade_data.sl_price else trade.sl_price
    trade.tp_price = trade_data.tp_price if trade_data.tp_price else trade.tp_price
    trade.status = TradeStatus.MODIFIED
    db.commit()

    # Send real-time update via WebSocket
    await manager.broadcast({
        "event": "trade_modified",
        "trade_id": str(trade.id),
        "symbol": trade_data.symbol,
        "status": trade.status.value
    })

    return {"message": "Trade modified successfully"}

async def close_trade(db: Session, trade_id: str):
    """Closes a trade, logs journal entry, and sends real-time updates."""
    trade = db.query(Trade).filter(Trade.id == trade_id).first()
    if not trade:
        return {"error": "Trade not found"}

    trade.status = TradeStatus.CLOSED
    trade.closed_at = datetime.utcnow()

    # Calculate Profit/Loss
    profit_loss = (trade.tp_price - trade.entry_price) * trade.lot_size if trade.tp_price else 0
    risk_reward_ratio = calculate_risk_reward(trade.entry_price, trade.sl_price, trade.tp_price)

    # Create trade journal entry
    journal_data = {
        "trade_id": trade.id,
        "profit_loss": profit_loss,
        "risk_reward_ratio": risk_reward_ratio,
        "trade_notes": "Trade closed",
    }
    create_trade_journal_entry(db, journal_data)

    db.commit()

    # Send real-time update via WebSocket
    await manager.broadcast({
        "event": "trade_closed",
        "trade_id": str(trade.id),
        "symbol": trade.trade_pair.symbol,
        "status": trade.status.value,
        "profit_loss": profit_loss
    })

    return {"message": "Trade closed and journal entry created"}
