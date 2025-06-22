from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from app.utils.jwt_auth import decode_access_token
from app.utils.websocket_manager import manager

websocket_router = APIRouter()

@websocket_router.websocket("/ws/trades")
async def websocket_endpoint(websocket: WebSocket, token: str):
    user = decode_access_token(token)
    
    if not user:
        await websocket.close(code=1008)  # 1008: Policy Violation (Invalid Token)
        return

    user_id = user["id"]
    await manager.connect(websocket, user_id)

    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        await manager.disconnect(websocket, user_id)
