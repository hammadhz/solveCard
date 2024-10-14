import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must only contain letters and spaces",
    }),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(11, { message: "Phone number must not exceed 11 digits" })
    .regex(/^\d+$/, { message: "Phone number must only contain numbers" }),

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

  role: z
    .string()
    .min(6, { message: "Role is required" })
    .max(50, { message: "Role must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Role must only contain letters and spaces",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    }),

  password_confirmation: z
    .string()
    .min(6, { message: "Confirm Password is required" })
    .max(8, { message: "Confirm Password must not exceed 8 characters" }),
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

export const forgotPwdSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must not contain special symbols except @, _, -",
    }),

  otp: z.string(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    }),

  password_confirmation: z
    .string()
    .min(6, { message: "Confirm Password is required" })
    .max(8, { message: "Confirm Password must not exceed 8 characters" }),
});
