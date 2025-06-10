"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";


interface Conversacion {
  id: string;
  nombreOtro: string;
  ultimoMensaje: string;
}


interface Props {
  userId: string;
  setConversacionActiva: (id: string) => void;
}

export default function ChatListaConversaciones({ userId, setConversacionActiva }: Props) {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "conversaciones"),
      where("participantes", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Conversacion[];

      setConversaciones(data);
      if (data.length > 0) {
        setConversacionActiva(data[0].id); // activa la primera por defecto
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="lista-chat" style={{ padding: "1rem", width: "30%", background: "#f5f5f5", overflowY: "auto" }}>
      <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Conversaciones</h3>
      {conversaciones.length === 0 && (
        <p style={{ color: "#999" }}>No hay conversaciones disponibles</p>
      )}
      {conversaciones.map((conv) => (
        <div
          key={conv.id}
          onClick={() => setConversacionActiva(conv.id)}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "0.75rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <p style={{ fontWeight: "bold", margin: 0 }}>{conv.nombreOtro}</p>
          <span style={{ fontSize: "0.9rem", color: "#555" }}>
            {conv.ultimoMensaje || "Sin mensajes"}
          </span>
        </div>
      ))}
    </div>
  );
}
