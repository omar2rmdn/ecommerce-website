import z from "zod";

const RegsiterSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is Required" }),
    lastName: z.string().min(1, { message: "Last Name is Required" }),
    email: z.string().min(1, { message: "Email is Required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password is at Least 8 Characters" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is Required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Passwords Don't Match",
    path: ["confirmPassword"],
  });

type RegisterType = z.infer<typeof RegsiterSchema>;

export { RegsiterSchema, type RegisterType };
