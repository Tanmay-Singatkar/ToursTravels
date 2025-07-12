import { z } from "zod";

// Regular expression for email validation
const emailRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?!.*[\d]{5,})([^\s@]{5,40})@[^\s@]+\.[^\s@]+$/;

// Login schema
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .regex(emailRegex, {
      message:
        "Email must contain both letters and numbers and should not be purely numerical.",
    })
    .email({ message: "Invalid email address." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(24, { message: "Password cannot exceed 24 characters." }),
});

// Signup schema extending the login schema
export const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50, { message: "Username cannot exceed 50 characters." }),
  role: z.string({ required_error: "role is required" }),
});
