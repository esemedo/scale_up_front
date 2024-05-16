import { z } from "zod"

export const formSchema = z.object({
    substitute: z.string({
        message: "Le remplaçant n'est pas valide.",
      }),
      reason: z.string({
        message: "La raison n'est pas valide.",
      }),
      startTime: z.string().time({
        message: "L'heure n'est pas valide.",
      }),
      endTime: z.string().time({
        message: "L'heure n'est pas valide.",
      })
  })