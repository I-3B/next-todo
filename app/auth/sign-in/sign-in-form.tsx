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
import { handleActionSubmit } from "@/lib/server-action";
import { AuthRegisterDto } from "@/services/auth/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = AuthRegisterDto;

export function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={handleActionSubmit(
          form,
          (data) =>
            signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: false,
            }),
          {
            onSuccess: () => {
              router.replace("/");
            },
          }
        )}
        className="space-y-4"
      >
        {" "}
        <Card className="m-5 sm:mx-auto sm:max-w-lg">
          <CardHeader>
            <CardTitle className="self-center">
              <Logo />
            </CardTitle>
            <CardDescription className="flex text-foreground flex-col text-center text-sm md:text-base">
              Sign-in into your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0 md:pb-6">
            <Stack gap="form">
              <FormInput name="email" label="Email" />
              <FormPasswordInput name="password" label="Password" />
            </Stack>
          </CardContent>
          <CardFooter className="justify-center">
            <FormSubmit>Sign In</FormSubmit>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
