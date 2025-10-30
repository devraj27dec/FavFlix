import z from 'zod'


export const MovieType = z.object({
  title: z.string().min(1, "Title is required"),
  director: z.string().min(1, "Director is required"),
  type: z.string().min(1, "Type is required"),
  budget: z.coerce.number().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().datetime().or(z.string().min(1, "Duration is required")),
  year: z.string().datetime().or(z.string().min(1, "Year is required")),
  userId: z.number().int().optional(),
  image: z.string().optional()
});


export type MovieShema = z.infer<typeof MovieType>