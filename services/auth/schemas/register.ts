import { z } from "zod";
export const PasswordSchema = z
  .string()
  .min(8)
  .max(20)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\s).{8,20}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });
export const AuthRegisterDto = z.object({
  email: z.string().email(),
  password: PasswordSchema,
});
