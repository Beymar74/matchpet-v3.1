'use client';

interface Solicitud {
  estado: string;
  cantidad: number;
}

interface EstadisticasSolicitudesProps {
  solicitudes: Solicitud[];
  totalSolicitudes: number;
}

const EstadisticasSolicitudes: React.FC<EstadisticasSolicitudesProps> = ({
  solicitudes,
  totalSolicitudes,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {solicitudes.map((sol, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-[#6093BF] rounded-full text-white text-lg font-semibold">
            {sol.estado.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{sol.estado}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">{sol.cantidad} Solicitudes</div>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-2 bg-gray-300 rounded-full">
              <div
                className="h-full bg-[#30588C] rounded-full"
                style={{ width: `${Math.round((sol.cantidad / totalSolicitudes) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstadisticasSolicitudes;
