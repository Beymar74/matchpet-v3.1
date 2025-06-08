// Datos simulados iniciales (solo respaldo)
export const fichasMedicasSimuladas = [
  {
    idMascota: "1",
    vacunas: "Rabia, Moquillo",
    alergias: "Polen",
    enfermedades: "Ninguna",
    esterilizado: "Sí",
    notas: "Revisión mensual",
  },
  {
    idMascota: "2",
    vacunas: "Triple felina",
    alergias: "Pollo",
    enfermedades: "Dermatitis",
    esterilizado: "No",
    notas: "Usar shampoo especial",
  },
]

// Función que primero busca en localStorage y si no encuentra, usa el arreglo base
export function obtenerFichaMedicaPorId(id: string) {
  try {
    const datosLocales = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')
    const encontradaLocal = datosLocales.find((f: any) => f.idMascota === id)
    if (encontradaLocal) return encontradaLocal
  } catch (e) {
    console.warn('Error leyendo fichas desde localStorage:', e)
  }

  // Si no hay en localStorage, buscar en las simuladas
  return fichasMedicasSimuladas.find(f => f.idMascota === id) || null
}
