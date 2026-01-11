import "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { api } from "@/lib/api";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { TextField } from "@/components/forms/text-field";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "student" | "writer" | "admin";
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<LoginResponse>("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Store token in HTTP-only cookie (handled by backend; frontend trusts credentials: include)
      // Redirect based on role
      const role = response.user.role;
      if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "writer") {
        router.push("/writer/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="Log in" description="Access your academic writing workspace." />
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md" title="Sign in">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextField
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="name@example.com"
              required
            />
            <TextField
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <Button type="submit" variant="primary" className="w-full" loading={isLoading} disabled={formState.isSubmitting}>
              Sign in
            </Button>
          </form>

          <div className="mt-5 border-t border-slate-200 pt-4 text-center text-sm">
            <span className="text-slate-600">Don't have an account? </span>
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
              Create one
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
