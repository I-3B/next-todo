"use client";

import { Logo } from "@/components/shared/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/form-input";
import { FormPasswordInput } from "@/components/ui/form/form-password-input";
import { FormSubmit } from "@/components/ui/form/form-submit";
import { Stack } from "@/components/ui/stack";
import { COOKIES } from "@/constants/cookies";
import { setCookie } from "@/lib/client/cookies";
import { formName } from "@/lib/client/form";
import { handleActionSubmit } from "@/lib/server-action";
import { AuthRegisterDto, PasswordSchema } from "@/services/auth/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import action from "./action";
const schema = AuthRegisterDto.extend({
  confirmPassword: PasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match!",
});
export type RegisterFormProps = {};
export function RegisterForm({}: RegisterFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const n = formName<typeof form>;
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={handleActionSubmit(form, action, {
          onSuccess: async (_, data) => {
            await signIn("credentials", {
              redirect: false,
              ...data,
            });
            setCookie(COOKIES.HAS_VISITED, "true");
            router.replace("/");
          },
        })}
      >
        <Card className="m-5 sm:mx-auto sm:max-w-lg">
          <CardHeader>
            <CardTitle className="self-center">
              <Logo />
            </CardTitle>
            <CardDescription className="flex text-foreground flex-col text-center text-sm md:text-base">
              Create New Account
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0 md:pb-6">
            <Stack gap="form">
              <FormInput name={n("email")} label="Email" />
              <FormPasswordInput name={n("password")} label="Password" />
              <FormPasswordInput name={n("confirmPassword")} label="Confirm Password" />
            </Stack>
          </CardContent>
          <CardFooter className="justify-center">
            <FormSubmit />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
