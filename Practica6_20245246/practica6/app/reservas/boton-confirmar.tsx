"use client";

import { confirmarReserva } from "@/app/actions/reservas";
import { useState } from "react";

export function BotonConfirmarReserva({ id }: { id: number }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function manejarClick() {
    setLoading(true);
    const resultado = await confirmarReserva(id);
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
        className="text-sm text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Confirmando..." : "Confirmar"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
