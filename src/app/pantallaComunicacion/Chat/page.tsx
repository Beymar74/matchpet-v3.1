"use client";

import { useState } from "react";
import ChatListaConversaciones from "@/components/chat/ChatListaConversaciones";
import ChatMensajes from "@/components/chat/ChatMensajes";
import ChatEntradaMensaje from "@/components/chat/ChatEntradaMensaje";

export default function ChatUsuario() {
  const userId = "usuario_123";
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null);

  return (
    <div
      className="chat-container"
      style={{
        display: "flex",
        height: "80vh",
        backgroundColor: "#eee",
        paddingTop: "20px", // ✅ espacio para el header fijo
        boxSizing: "border-box", // asegura que no se desborde
      }}
    >
      {/* Lista lateral */}
      <div
        style={{
          width: "30%",
          padding: "1rem",
          borderRight: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        <h2 className="text-gray-800 font-semibold mb-2">Conversaciones</h2>
        <ChatListaConversaciones
          userId={userId}
          setConversacionActiva={setConversacionActiva}
        />
      </div>

      {/* Panel de mensajes */}
      {conversacionActiva ? (
        <div
          className="chat-box"
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            height: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <ChatMensajes conversacionId={conversacionActiva} />
          </div>

          <div style={{ padding: "1rem" }}>
            <ChatEntradaMensaje
              conversacionId={conversacionActiva}
              emisor={userId}
            />
          </div>
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
