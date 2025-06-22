from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.risk_schema import RiskSettingUpdate
from app.services.risk_setting_service import update_risk_setting

risk_setting_router = APIRouter(prefix="/risk", tags=["Risk Settings"])

@risk_setting_router.post("/set")
def set_risk_setting(risk_data: RiskSettingUpdate, db: Session = Depends(get_db)):
    response = update_risk_setting(db, risk_data)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response
