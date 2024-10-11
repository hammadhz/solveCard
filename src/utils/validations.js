import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(6, { message: "Full Name is required" })
    .max(50, { message: "Full Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Full Name must only contain letters and spaces",
    }),

  email: z
    .string()
    .min(6, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must not contain special symbols except @, _, -",
    }),

  companyName: z
    .string()
    .min(6, { message: "Company Name is required" })
    .max(50, { message: "Company Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Company Name must only contain letters and spaces",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must not contain special symbols except @, _, -",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    }),
});
