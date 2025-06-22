from fastapi import WebSocket
from typing import Dict, List

class WebSocketManager:
    """Manages WebSocket connections and broadcasts real-time trade updates."""
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)

    async def disconnect(self, websocket: WebSocket, user_id: str):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def broadcast(self, message: dict):
        """Broadcasts a trade update to all connected clients."""
        for connections in self.active_connections.values():
            for websocket in connections:
                await websocket.send_json(message)

manager = WebSocketManager()
