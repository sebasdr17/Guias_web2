import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PaginaInicio() {
  const [totalServicios, totalReservas] = await Promise.all([
    prisma.servicio.count(),
    prisma.reserva.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Bienvenido</h1>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
          <p className="text-xs text-black uppercase mb-1">Servicios</p>
          <p className="text-3xl font-semibold">{totalServicios}</p>
        </div>
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
          <p className="text-xs text-black uppercase mb-1">Reservas</p>
          <p className="text-3xl font-semibold">{totalReservas}</p>
        </div>
      </div>
      <Link href="/servicios/nuevo" className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors">
        Agregar servicio
      </Link>
    </div>
  );
}
