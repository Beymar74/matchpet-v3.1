"use client";

import { useState } from "react";
import ChatListaConversaciones from "@/components/chat/ChatListaConversaciones";
import ChatMensajes from "@/components/chat/ChatMensajes";
import ChatEntradaMensaje from "@/components/chat/ChatEntradaMensaje";



export default function ChatRefugio() {
  const refugioId = "refugio_123"; // 🔁 Cambia por el ID real del refugio autenticado
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null);

  return (
    <div className="chat-container" style={{ display: "flex", height: "100vh" }}>
      {/* Lista de conversaciones a la izquierda */}
      <ChatListaConversaciones
        userId={refugioId}
        setConversacionActiva={setConversacionActiva}
      />

      {/* Vista de chat a la derecha */}
      {conversacionActiva && (
        <div className="chat-box" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <ChatMensajes conversacionId={conversacionActiva} />
          <ChatEntradaMensaje conversacionId={conversacionActiva} emisor={refugioId} />
        </div>
      )}
    </div>
  );
}
