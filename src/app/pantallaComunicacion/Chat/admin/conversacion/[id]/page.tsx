"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DetalleConversacion() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    if (!id) return;

    // Obtener datos del ticket
    const fetchTicket = async () => {
      const docSnap = await getDoc(doc(db, "conversaciones", id as string));
      if (docSnap.exists()) setTicket({ id, ...docSnap.data() });
    };

    fetchTicket();

    // Escuchar mensajes en tiempo real
    const q = query(
      collection(db, `conversaciones/${id}/mensajes`),
      orderBy("fecha")
    );

    const unsub = onSnapshot(q, (snap) => {
      const datos = snap.docs.map((doc) => doc.data());
      setMensajes(datos);
    });

    return () => unsub();
  }, [id]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

    await addDoc(collection(db, `conversaciones/${id}/mensajes`), {
      texto: nuevoMensaje,
      emisor: "admin",
      fecha: serverTimestamp(),
    });

    await addDoc(collection(db, "notificaciones"), {
      tipo: "respuesta_admin",
      mensaje: nuevoMensaje,
      para: ticket.participantes?.find((p: string) => p !== "admin") ?? "usuario",
      fecha: serverTimestamp(),
    });

    setNuevoMensaje("");
  };

  if (!ticket) return <p className="p-4">Cargando conversación...</p>;
  const router = useRouter();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Detalle del Ticket</h1>

      {/* Datos del ticket */}
      <div className="bg-white rounded-lg shadow p-4">
        <p><strong>Asunto:</strong> {ticket.ultimoMensaje}</p>
        <p><strong>Participantes:</strong> {ticket.participantes?.join(", ")}</p>
        <p><strong>Fecha última:</strong> {new Date(ticket.ultimaFecha?.toDate()).toLocaleString()}</p>
      </div>

      {/* Conversación */}
      <div className="bg-white rounded-lg shadow p-4 max-h-[400px] overflow-y-auto space-y-2">
        {mensajes.length === 0 ? (
          <p className="text-sm text-gray-400">No hay mensajes</p>
        ) : (
          mensajes.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded w-fit max-w-[70%] ${
                msg.emisor === "admin"
                  ? "ml-auto bg-blue-100"
                  : "bg-gray-200"
              }`}
            >
              <p className="text-sm">{msg.texto}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.fecha?.toDate()).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Entrada de mensaje */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Responder..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button
		onClick={() => router.push(`/pantallaComunicacion/Chat/admin/conversacion/${conversacion.id}`)}
		className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
		>
		<Eye className="h-4 w-4" />
		</button>
      </div>
    </div>
  );
}
