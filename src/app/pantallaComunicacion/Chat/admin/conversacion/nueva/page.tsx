"use client";

import { useState } from "react";
import ChatListaConversaciones from "@/components/chat/ChatListaConversaciones";
import ChatMensajes from "@/components/chat/ChatMensajes";
import ChatEntradaMensaje from "@/components/chat/ChatEntradaMensaje";

export default function ChatAdmin() {
  const adminId = "admin_001"; // ✅ ID que debe estar en el campo 'participantes' de cada conversación
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null);

  return (
    <div
      className="chat-container"
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "sans-serif",
      }}
    >
      {/* Lista de conversaciones */}
      <ChatListaConversaciones
        userId={adminId}
        setConversacionActiva={setConversacionActiva}
      />

      {/* Panel derecho */}
      {conversacionActiva ? (
        <div
          className="chat-box"
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #dee2e6",
          }}
        >
          <ChatMensajes conversacionId={conversacionActiva} />
          <ChatEntradaMensaje
            conversacionId={conversacionActiva}
            emisor={adminId}
          />
        </div>
      ) : (
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6c757d",
            fontStyle: "italic",
            fontSize: "1.1rem",
          }}
        >
          Selecciona una conversación con un usuario o refugio para comenzar
        </div>
      )}
    </div>
  );
}
