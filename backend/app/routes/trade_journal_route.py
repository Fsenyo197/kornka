from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.trade_journal_schema import JournalCreate
from app.services.trade_journal_service import create_trade_journal_entry, export_journal_csv

trade_journal_router = APIRouter(prefix="/journal", tags=["Trade Journal"])

@trade_journal_router.post("/add")
def add_journal_entry(journal_data: JournalCreate, db: Session = Depends(get_db)):
    response = create_trade_journal_entry(db, journal_data)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

trade_journal_router.get("/export/csv")
def export_journal_as_csv(user_id: str, db: Session = Depends(get_db)):
    response = export_journal_csv(db, user_id)

    if "error" in response:
        raise HTTPException(status_code=404, detail=response["error"])

    return response
