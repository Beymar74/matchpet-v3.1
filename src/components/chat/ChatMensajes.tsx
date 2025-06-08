import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";


export default function ChatMensajes({ conversacionId }) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, `conversaciones/${conversacionId}/mensajes`),
      orderBy("fecha", "asc")
    );
    const unsub = onSnapshot(q, (snap) =>
      setMensajes(snap.docs.map(doc => doc.data()))
    );
    return () => unsub();
  }, [conversacionId]);

  return (
    <div className="mensajes">
      {mensajes.map((m, i) => (
        <div key={i} className={m.emisor === "usuario" ? "mensaje-usuario" : "mensaje-refugio"}>
          {m.texto}
        </div>
      ))}
    </div>
  );
}
