import dataset from "@/data/pet_adoption_data.json";

// Función para codificar texto a número
function codificarValor(valor: string, lista: string[]): number {
  const idx = lista.indexOf(valor);
  return idx === -1 ? lista.length : idx;
}

// Listas de categorías
const tipos = ["Dog", "Cat", "Rabbit", "Bird"];
const tamaños = ["Small", "Medium", "Large"];
const colores = ["White", "Black", "Brown", "Gray", "Orange"];

// Distancia entre mascotas
function calcularDistancia(a: any, b: any): number {
  return (
    0.15 * Math.abs(a.AgeMonths - b.AgeMonths) +
    0.1 * Math.abs(a.TimeInShelterDays - b.TimeInShelterDays) +
    0.1 * Math.abs(a.AdoptionFee - b.AdoptionFee) +
    0.1 * Math.abs(a.WeightKg - b.WeightKg) +
    0.15 * Math.abs(codificarValor(a.PetType, tipos) - codificarValor(b.PetType, tipos)) +
    0.1 * Math.abs(codificarValor(a.Size, tamaños) - codificarValor(b.Size, tamaños)) +
    0.05 * Math.abs(codificarValor(a.Color, colores) - codificarValor(b.Color, colores)) +
    0.1 * Math.abs(a.Vaccinated - b.Vaccinated) +
    0.1 * Math.abs(a.HealthCondition - b.HealthCondition) +
    0.05 * Math.abs(a.PreviousOwner - b.PreviousOwner)
  );
}

// Función principal
export function estimarAdoptabilidad(mascota: any, K = 10): number {
  const vecinos = dataset
    .map((item: any) => ({
      ...item,
      distancia: calcularDistancia(mascota, item),
    }))
    .sort((a, b) => a.distancia - b.distancia)
    .slice(0, K);

  const promedio = vecinos.reduce((acc, m) => acc + m.AdoptionLikelihood, 0) / K;
  return Math.round(promedio * 100);
}
