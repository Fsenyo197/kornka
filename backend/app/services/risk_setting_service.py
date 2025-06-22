from sqlalchemy.orm import Session
from app.models.risk_setting_model import RiskSetting
from app.models.trade_pair_model import TradePair
from app.schemas.risk_schema import RiskSettingUpdate
from app.utils.get_pip import DEFAULT_SL_PIPS, DEFAULT_TP_PIPS, PIP_VALUES


def get_pip_value(asset_type: str):
    return PIP_VALUES.get(asset_type, 0.0001)  # Default to Forex pip size

def get_risk_settings(db: Session, user_id: str, pair_id: str = None):
    # Try to fetch pair-specific settings
    risk_setting = db.query(RiskSetting).filter(
        RiskSetting.user_id == user_id,
        RiskSetting.pair_id == pair_id
    ).first()

    if risk_setting:
        return risk_setting

    # If no pair-specific setting, return general user setting
    return db.query(RiskSetting).filter(
        RiskSetting.user_id == user_id,
        RiskSetting.pair_id == None
    ).first()

def calculate_sl_tp(entry_price: float, asset_type: str, risk_setting: RiskSetting = None):
    pip_value = get_pip_value(asset_type)
    
    sl_pips = risk_setting.default_sl if risk_setting and risk_setting.default_sl is not None else DEFAULT_SL_PIPS
    tp_pips = risk_setting.default_tp if risk_setting and risk_setting.default_tp is not None else DEFAULT_TP_PIPS

    sl_price = entry_price - (sl_pips * pip_value)
    tp_price = entry_price + (tp_pips * pip_value)

    return sl_price, tp_price

def update_risk_setting(db: Session, risk_data: RiskSettingUpdate):
    existing_setting = db.query(RiskSetting).filter(
        RiskSetting.user_id == risk_data.user_id,
        RiskSetting.pair_id == risk_data.pair_id
    ).first()

    if existing_setting:
        existing_setting.default_sl = risk_data.default_sl
        existing_setting.default_tp = risk_data.default_tp
    else:
        new_setting = RiskSetting(
            user_id=risk_data.user_id,
            pair_id=risk_data.pair_id,
            default_sl=risk_data.default_sl,
            default_tp=risk_data.default_tp
        )
        db.add(new_setting)

    db.commit()
    return {"message": "Risk settings updated"}
