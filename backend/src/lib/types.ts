import z from "zod";


export const registerSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const MovieSchema = z.object({
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