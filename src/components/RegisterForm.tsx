"use client";

import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { registerAction } from "@/actions/auth-actions";
import { Button, Input } from "@nextui-org/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        console.log("Datos enviados:", values);
        setError(response.error);
      } else {
        router.push("/login");
      }
    });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-green-300">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-black">
          Registrarse
        </h1>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <Input
              {...form.register("name")}
              type="text"
              label="Usuario"
              variant="bordered"
              placeholder="Ingresa tu correo electrónico"
              fullWidth
              className="rounded-lg text-black placeholder-gray-500"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          {/* Email Input */}
          <div>
            <Input
              {...form.register("email")}
              type="email"
              label="Usuario"
              variant="bordered"
              placeholder="Ingresa tu correo electrónico"
              fullWidth
              className="rounded-lg text-black placeholder-gray-500"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Input
              {...form.register("password")}
              label="Contraseña"
              variant="bordered"
              placeholder="Ingresa tu contraseña"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IconEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              fullWidth
              className="rounded-lg text-black placeholder-gray-500"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-center text-sm text-red-500">{error}</p>
          )}

          {/* Submit Button */}
          <Button
            className="mt-6 w-full text-black"
            type="submit"
            color="primary"
            size="lg"
            isDisabled={isPending}
          >
            {isPending ? "Cargando..." : "Ingresar"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default FormRegister;
