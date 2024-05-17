import { z } from "zod"
const ACCEPTED_FILE_TYPES = ["application/pdf"]
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


export const formSchemaDei =  z.object({
  id: z.number({
    message: "Le numéro de la tâche n'est pas valide.",
  }),
  sashaStatus : z.string({
    message: "Le status SACHA n'est pas valide.",
  }),
  status: z.number({
    message: "Le status n'est pas valide.",
  }),
  totalPrice: z.number({
    message: "Le prix total n'est pas valide.",
  }),
  dueDate:  z.string().date(
    "La date d'écheance n'est pas valide.",
  ),
  hourlyPrice: z.number({
    message: "Le tarif horaire n'est pas valide.",
  }),
  priority: z.string({
    message: "La priorité n'est pas valide.",
  }),
 
  // z
  // .instanceof(File)
  // .refine((file) => {
  //   return !file || ACCEPTED_FILE_TYPES.includes(file.type);
  // }, 'Le fichier doit être un PDF.')
})