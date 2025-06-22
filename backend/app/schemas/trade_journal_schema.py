from pydantic import BaseModel
from typing import Optional

class JournalCreate(BaseModel):
    trade_id: str
    trade_notes: Optional[str] = None
