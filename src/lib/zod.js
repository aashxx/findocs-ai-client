import { z } from "zod";

export const signUpValidation = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be minimum 6 characters")
});

export const loginValidation = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be minimum 6 characters")
});