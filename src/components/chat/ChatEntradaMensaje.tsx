import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Props {
  conversacionId: string;
  emisor: string;
}

export default function ChatEntradaMensaje({ conversacionId, emisor }: Props) {
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = async () => {
    const texto = mensaje.trim();
    if (!texto || !conversacionId) return;

    try {
      // 1. Agregar mensaje a subcolección
      await addDoc(collection(db, `conversaciones/${conversacionId}/mensajes`), {
        texto,
        emisor,
        fecha: serverTimestamp(),
      });

      // 2. Actualizar resumen en documento principal
      await updateDoc(doc(db, "conversaciones", conversacionId), {
        ultimoMensaje: texto,
        ultimaFecha: serverTimestamp(),
      });

      setMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <div className="entrada-mensaje" style={{ display: "flex", padding: "1rem", borderTop: "1px solid #ccc" }}>
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        style={{ flex: 1, padding: "0.5rem", marginRight: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button
        onClick={enviarMensaje}
        disabled={!mensaje.trim()}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Enviar
      </button>
    </div>
  );
}
