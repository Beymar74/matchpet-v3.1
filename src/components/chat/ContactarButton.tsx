"use client";

import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";


interface ContactarButtonProps {
  usuarioId: string;
  refugioId: string;
  nombreRefugio: string;
  nombreMascota?: string;
}

export default function ContactarButton({
  usuarioId,
  refugioId,
  nombreRefugio,
  nombreMascota,
}: ContactarButtonProps) {
  const router = useRouter();

  const iniciarConversacion = async () => {
    const conversacionesRef = collection(db, "conversaciones");

    const q = query(
      conversacionesRef,
      where("participantes", "array-contains", usuarioId)
    );
    const snapshot = await getDocs(q);

    const existente = snapshot.docs.find(doc => {
      const data = doc.data();
      return data.participantes.includes(refugioId);
    });

    if (existente) {
      router.push(`/chat?convId=${existente.id}`);
      return;
    }

    const nuevaConv = await addDoc(conversacionesRef, {
      participantes: [usuarioId, refugioId],
      nombreOtro: nombreRefugio,
      ultimoMensaje: nombreMascota
        ? `Hola, me interesa ${nombreMascota}`
        : `Hola, quiero ponerme en contacto`,
      ultimaFecha: serverTimestamp(),
    });

    await addDoc(collection(db, `conversaciones/${nuevaConv.id}/mensajes`), {
      texto: nombreMascota
        ? `Hola, estoy interesado en ${nombreMascota}`
        : `Hola, me gustaría saber más sobre su refugio`,
      emisor: usuarioId,
      fecha: serverTimestamp(),
    });

    router.push(`/chat?convId=${nuevaConv.id}`);
  };

  return (
    <button
      onClick={iniciarConversacion}
      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
    >
      Contactar al Refugio
    </button>
  );
}
