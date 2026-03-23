"use client";

import { cancelarReserva } from "@/app/actions/reservas";
import { useState } from "react";

export function BotonCancelarReserva({ id }: { id: number }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function manejarClick() {
    setLoading(true);
    const resultado = await cancelarReserva(id);
    if (!resultado.exito) {
      setError(resultado.mensaje ?? "Error desconocido.");
    }
    setLoading(false);
  }

  return (
    <div className="text-right">
      <button
        onClick={manejarClick}
        disabled={loading}
        className="text-sm text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Cancelando..." : "Cancelar"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
