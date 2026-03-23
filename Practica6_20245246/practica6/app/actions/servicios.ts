"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const esquema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  duracion: z.coerce.number().min(1),
});

export async function crearServicio(prevState: any, formData: FormData) {
  const parsed = esquema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errores: parsed.error.flatten().fieldErrors, mensaje: "" };
  }

  await prisma.servicio.create({ data: parsed.data });

  revalidatePath("/servicios");

  return { errores: {}, mensaje: "Servicio creado" };
}

export async function eliminarServicio(id: number) {
  try {
    await prisma.servicio.delete({ where: { id } });
    revalidatePath("/servicios");
    return { exito: true };
  } catch {
    return { exito: false, mensaje: "Error al eliminar" };
  }
}
