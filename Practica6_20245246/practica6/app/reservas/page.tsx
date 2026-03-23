import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BotonEliminarReserva } from "./boton-eliminar";
import { BotonCancelarReserva } from "./boton-cancelar";
import { BotonConfirmarReserva } from "./boton-confirmar";
import { tarjeta } from "@/app/lib/estilos";

export const dynamic = "force-dynamic";

const etiquetaEstado: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  confirmada: "bg-green-100 text-green-800 border border-green-300",
  cancelada: "bg-gray-100 text-gray-800 border border-gray-300",
};

export default async function PaginaReservas({ searchParams }: any) {
  const estado = searchParams?.estado;

  const reservas = await prisma.reserva.findMany({
    where: estado ? { estado } : {},
    orderBy: { fecha: "asc" },
    include: { servicio: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Reservas</h1>
        <Link href="/reservas/nueva" className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors">
          Nueva reserva
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/reservas"
          className={`px-3 py-1.5 rounded text-sm border ${
            !estado
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          Todas
        </Link>
        <Link
          href="/reservas?estado=pendiente"
          className={`px-3 py-1.5 rounded text-sm border ${
            estado === "pendiente"
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          Pendientes
        </Link>
        <Link
          href="/reservas?estado=confirmada"
          className={`px-3 py-1.5 rounded text-sm border ${
            estado === "confirmada"
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          Confirmadas
        </Link>
        <Link
          href="/reservas?estado=cancelada"
          className={`px-3 py-1.5 rounded text-sm border ${
            estado === "cancelada"
              ? "bg-black text-white border-black"
              : "border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          Canceladas
        </Link>
      </div>

      {reservas.length === 0 ? (
        <p className="text-sm text-black">No hay reservas registradas.</p>
      ) : (
        <ul className="space-y-3">
          {reservas.map((reserva) => (
            <li key={reserva.id} className={`${tarjeta} flex items-start justify-between`}>
              <div className="flex-1">
                <p className="font-medium text-sm">{reserva.nombre}</p>
                <p className="text-xs text-black mt-0.5">{reserva.correo}</p>
                <p className="text-xs text-black mt-1">
                  {reserva.servicio.nombre} —{" "}
                  {new Date(reserva.fecha).toLocaleString("es-SV")}
                </p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${etiquetaEstado[reserva.estado] ?? etiquetaEstado.pendiente}`}>
                  {reserva.estado}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                {reserva.estado === "pendiente" && (
                  <BotonConfirmarReserva id={reserva.id} />
                )}
                {reserva.estado !== "cancelada" && (
                  <BotonCancelarReserva id={reserva.id} />
                )}
                {reserva.estado === "cancelada" && (
                  <BotonEliminarReserva id={reserva.id} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
