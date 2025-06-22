from sqlalchemy import Column, String, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.models.base_model import Base
from app.utils.enums import AssetType

class TradePair(Base):
    __tablename__ = "trade_pairs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symbol = Column(String, unique=True, nullable=False)
    asset_type = Column(Enum(AssetType, name="asset_type_enum"), nullable=True)

    trades = relationship("Trade", back_populates="trade_pair")
    risk_settings = relationship("RiskSetting", back_populates="trade_pair")
