import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function ChatMensajes({ conversacionId }) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    if (!conversacionId) return;

    const q = query(
      collection(db, `conversaciones/${conversacionId}/mensajes`),
      orderBy("fecha", "asc")
    );

    const unsub = onSnapshot(q, (snap) =>
      setMensajes(snap.docs.map((doc) => doc.data()))
    );

    return () => unsub();
  }, [conversacionId]);

  return (
    <div className="flex flex-col gap-2">
      {mensajes.map((m, i) => {
        const esUsuario = m.emisor === "usuario_123"; // 👈 cambia según tu lógica real
        return (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
              esUsuario
                ? "bg-blue-100 text-blue-900 self-end mr-2"
                : "bg-gray-200 text-gray-800 self-start ml-2"
            }`}
          >
            {m.texto}
          </div>
        );
      })}
    </div>
  );
}
