from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.analytics_service import calculate_trade_metrics

analytics_router = APIRouter(prefix="/analytics", tags=["Trade Analytics"])

@analytics_router.get("/performance")
def trade_performance(user_id: str, db: Session = Depends(get_db)):
    return calculate_trade_metrics(db, user_id)
