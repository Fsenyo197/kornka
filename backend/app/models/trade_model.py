from sqlalchemy import Column, Float, Enum, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.models.base_model import Base
from app.utils.enums import TradeAction, TradeStatus


class Trade(Base):
    __tablename__ = "trades"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    pair_id = Column(UUID(as_uuid=True), ForeignKey("trade_pairs.id"), nullable=False)
    action = Column(Enum(TradeAction, name="trade_action_enum"), nullable=False)
    lot_size = Column(Float, nullable=False)
    entry_price = Column(Float, nullable=False)
    sl_price = Column(Float, nullable=True)
    tp_price = Column(Float, nullable=True)
    status = Column(Enum(TradeStatus, name="trade_status_enum"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    closed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="trades")
    trade_pair = relationship("TradePair", back_populates="trades")
    trade_journal = relationship("TradeJournal", back_populates="trade", uselist=False)
