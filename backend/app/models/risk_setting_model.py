from sqlalchemy import Column, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.models.base_model import Base

class RiskSetting(Base):
    __tablename__ = "risk_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    pair_id = Column(UUID(as_uuid=True), ForeignKey("trade_pairs.id"), nullable=True)
    default_sl = Column(Float, nullable=True)
    default_tp = Column(Float, nullable=True)
    
    user = relationship("User", back_populates="risk_settings")
    trade_pair = relationship("TradePair", back_populates="risk_settings")
