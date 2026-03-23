"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const esquema = z.object({
  nombre: z.string().min(1),
  correo: z.string().email(),
  fecha: z.string(),
  servicioId: z.coerce.number(),
});

export async function crearReserva(prevState: any, formData: FormData) {
  const parsed = esquema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errores: parsed.error.flatten().fieldErrors, mensaje: "" };
  }

  // Obtener información del servicio
  const servicio = await prisma.servicio.findUnique({
    where: { id: parsed.data.servicioId },
  });

  if (!servicio) {
    return {
      errores: {
        servicioId: ["Servicio no encontrado"],
      },
      mensaje: "",
    };
  }

  // Calcular rango de tiempo
  const fechaInicio = new Date(parsed.data.fecha);
  const fechaFin = new Date(
    fechaInicio.getTime() + servicio.duracion * 60000
  );

  // Buscar conflictos de horario
  const conflicto = await prisma.reserva.findFirst({
    where: {
      servicioId: parsed.data.servicioId,
      estado: {
        not: "cancelada",
      },
      fecha: {
        lt: fechaFin,
      },
      AND: {
        fecha: {
          gte: new Date(fechaInicio.getTime() - servicio.duracion * 60000),
        },
      },
    },
  });

  if (conflicto) {
    return {
      errores: {
        fecha: ["Ya existe una reserva en ese horario"],
      },
      mensaje: "",
    };
  }

  await prisma.reserva.create({
    data: {
      ...parsed.data,
      fecha: new Date(parsed.data.fecha),
    },
  });

  revalidatePath("/reservas");

  return { errores: {}, mensaje: "Reserva creada" };
}

export async function eliminarReserva(id: number) {
  try {
    await prisma.reserva.delete({ where: { id } });
    revalidatePath("/reservas");
    return { exito: true };
  } catch {
    return { exito: false, mensaje: "Error al eliminar" };
  }
}

export async function cancelarReserva(id: number) {
  try {
    await prisma.reserva.update({
      where: { id },
      data: { estado: "cancelada" },
    });

    revalidatePath("/reservas");

    return { exito: true };
  } catch {
    return { exito: false, mensaje: "Error al cancelar" };
  }
}

export async function confirmarReserva(id: number) {
  try {
    await prisma.reserva.update({
      where: { id },
      data: { estado: "confirmada" },
    });

    revalidatePath("/reservas");

    return { exito: true };
  } catch {
    return { exito: false, mensaje: "Error al confirmar" };
  }
}
