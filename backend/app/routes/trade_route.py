from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.trade_schema import TradeCreate, TradeUpdate
from app.services.trade_service import open_trade, modify_trade, close_trade

trade_router = APIRouter(prefix="/trades", tags=["Trades"])

@trade_router.post("/open")
def open_new_trade(trade_data: TradeCreate, db: Session = Depends(get_db)):
    response = open_trade(db, trade_data)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@trade_router.put("/modify/{trade_id}")
def modify_existing_trade(trade_id: str, trade_data: TradeUpdate, db: Session = Depends(get_db)):
    response = modify_trade(db, trade_id, trade_data)
    if "error" in response:
        raise HTTPException(status_code=404, detail=response["error"])
    return response

@trade_router.post("/close/{trade_id}")
def close_existing_trade(trade_id: str, db: Session = Depends(get_db)):
    response = close_trade(db, trade_id)
    if "error" in response:
        raise HTTPException(status_code=404, detail=response["error"])
    return response
