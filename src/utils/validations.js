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
    .length(11, { message: "Phone number must be 11 digits" })
    .regex(/^\d+$/, { message: "Phone number must only contain numbers" }),

  companyName: z
    .string()
    .min(6, { message: "Company Name is required" })
    .max(50, {
      message: "Company Name must be less than 50 characters",
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Company Name must only contain letters and spaces",
    })
    .optional(),

  role: z
    .string()
    .min(6, { message: "Role is required" })
    .max(50, { message: "Role must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Role must only contain letters and spaces",
    })
    .optional(),

  email: z
    .string()
    .min(6, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must not contain special symbols except @, _, -",
    })
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    })
    .optional(),

  password_confirmation: z
    .string()
    .min(6, { message: "Confirm Password is required" })
    .max(8, {
      message: "Confirm Password must not exceed 8 characters",
    })
    .optional(),
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

  otp: z
    .string()
    .length(4, { message: "OTP must be exactly 4 digits." })
    .regex(/^\d{4}$/, {
      message: "OTP must contain only numeric digits.",
    })
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(8, { message: "Password must not exceed 8 characters" })
    .regex(/^[\w!@#$%^&*()_+=-]+$/, {
      message: "Password can contain letters, numbers, and special symbols",
    })
    .optional(),

  password_confirmation: z
    .string()
    .min(6, { message: "Confirm Password is required" })
    .max(8, { message: "Confirm Password must not exceed 8 characters" })
    .optional(),
});
