from pydantic import BaseModel
from typing import Optional
from app.utils.enums import TradeAction

class TradeCreate(BaseModel):
    user_id: str
    symbol: str
    asset_type: Optional[str] = None
    action: TradeAction
    lot_size: float
    entry_price: float
    sl_price: Optional[float] = None
    tp_price: Optional[float] = None

class TradeUpdate(BaseModel):
    lot_size: Optional[float] = None
    entry_price: Optional[float] = None
    sl_price: Optional[float] = None
    tp_price: Optional[float] = None
