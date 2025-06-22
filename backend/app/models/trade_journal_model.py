from sqlalchemy import Column, Float, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.models.base_model import Base

class TradeJournal(Base):
    __tablename__ = "trade_journal"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trade_id = Column(UUID(as_uuid=True), ForeignKey("trades.id"), nullable=False, unique=True)
    profit_loss = Column(Float, nullable=False)
    risk_reward_ratio = Column(Float, nullable=False)
    trade_notes = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    trade = relationship("Trade", back_populates="trade_journal")
