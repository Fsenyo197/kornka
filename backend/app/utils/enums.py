from enum import Enum as PyEnum

class TradeAction(str, PyEnum):
    BUY = "BUY"
    SELL = "SELL"

class TradeStatus(str, PyEnum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    MODIFIED = "MODIFIED"


class AssetType(str, PyEnum):
    FOREX = "FOREX"
    CRYPTO = "CRYPTO"
    STOCK = "STOCK"