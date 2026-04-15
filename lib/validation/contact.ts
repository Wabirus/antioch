import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please share a bit more detail."),
  website: z.string().trim().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

