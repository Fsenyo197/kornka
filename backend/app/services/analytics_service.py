import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from app.models.trade_model import Trade

def calculate_trade_metrics(db: Session, user_id: str):
    trades = db.query(Trade).filter(Trade.user_id == user_id, Trade.status == "CLOSED").all()
    
    if not trades:
        return {"message": "No closed trades available for analysis"}

    df = pd.DataFrame([{
        "entry_price": t.entry_price,
        "exit_price": t.tp_price if t.tp_price else t.sl_price,
        "lot_size": t.lot_size
    } for t in trades])

    df["profit_loss"] = (df["exit_price"] - df["entry_price"]) * df["lot_size"]
    df["win_rate"] = np.mean(df["profit_loss"] > 0) * 100
    df["average_profit"] = df[df["profit_loss"] > 0]["profit_loss"].mean()
    df["average_loss"] = df[df["profit_loss"] < 0]["profit_loss"].mean()
    df["risk_reward_ratio"] = abs(df["average_profit"] / df["average_loss"])

    return df[["win_rate", "average_profit", "average_loss", "risk_reward_ratio"]].to_dict(orient="records")[0]
