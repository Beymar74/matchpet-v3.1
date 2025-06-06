"use client";

import { useState } from "react";
import ChatListaConversaciones from "@/components/chat/ChatListaConversaciones";
import ChatMensajes from "@/components/chat/ChatMensajes";
import ChatEntradaMensaje from "@/components/chat/ChatEntradaMensaje";
import "@/styles/chat.css";

export default function ChatUsuario() {
  const userId = "usuario_123"; // 🔁 Reemplázalo luego por el ID real del usuario autenticado
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null);

  return (
    <div
      className="chat-container"
      style={{ display: "flex", height: "100vh", backgroundColor: "#eee" }}
    >
      <ChatListaConversaciones
        userId={userId}
        setConversacionActiva={setConversacionActiva}
      />

      {conversacionActiva ? (
        <div
          className="chat-box"
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          <ChatMensajes conversacionId={conversacionActiva} />
          <ChatEntradaMensaje conversacionId={conversacionActiva} emisor={userId} />
        </div>
      ) : (
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
            fontStyle: "italic",
          }}
        >
          Selecciona una conversación para comenzar
        </div>
      )}
    </div>
  );
}
