import csv
import os
from sqlalchemy.orm import Session
from app.models.trade_journal_model import TradeJournal
from app.models.trade_model import Trade
from app.schemas.trade_journal_schema import JournalCreate
from datetime import datetime

from dotenv import load_dotenv

load_dotenv()

# Load Backend URL (Change this in .env for production)
BACKEND_URL = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")

EXPORTS_DIR = "static/exports"
os.makedirs(EXPORTS_DIR, exist_ok=True)

def get_export_file_url(filename: str) -> str:
    """Generate a full URL for downloading an exported file."""
    return f"{BACKEND_URL}/static/exports/{filename}"

def calculate_risk_reward(entry_price: float, sl_price: float, tp_price: float):
    risk = abs(entry_price - sl_price)
    reward = abs(tp_price - entry_price)

    if risk == 0:
        return None 

    return round(reward / risk, 2)

def create_trade_journal_entry(db: Session, journal_data: JournalCreate):
    trade = db.query(Trade).filter(Trade.id == journal_data.trade_id).first()

    if not trade:
        return {"error": "Trade not found"}

    profit_loss = (trade.tp_price - trade.entry_price) * trade.lot_size if trade.tp_price else 0
    risk_reward_ratio = calculate_risk_reward(trade.entry_price, trade.sl_price, trade.tp_price)

    journal_entry = TradeJournal(
        trade_id=trade.id,
        profit_loss=profit_loss,
        risk_reward_ratio=risk_reward_ratio,
        trade_notes=journal_data.trade_notes,
        timestamp=datetime.utcnow()
    )

    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)

    return {"message": "Trade journal entry added"}

def export_journal_csv(db: Session, user_id: str):
    journals = db.query(TradeJournal).join(Trade).filter(Trade.user_id == user_id).all()

    if not journals:
        return {"error": "No trade journal entries found"}

    filename = f"trade_journal_{user_id}.csv"
    file_path = os.path.join(EXPORTS_DIR, filename)

    with open(file_path, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Trade ID", "Profit/Loss", "Risk/Reward", "Notes", "Timestamp"])

        for journal in journals:
            writer.writerow([journal.trade_id, journal.profit_loss, journal.risk_reward_ratio, journal.trade_notes, journal.timestamp])

    # Generate download URL
    download_url = get_export_file_url(filename)

    return {"message": "Trade journal exported successfully", "download_url": download_url}
