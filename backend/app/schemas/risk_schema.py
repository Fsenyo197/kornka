from pydantic import BaseModel
from typing import Optional

class RiskSettingUpdate(BaseModel):
    user_id: str
    pair_id: Optional[str] = None
    default_sl: Optional[float] = None
    default_tp: Optional[float] = None
