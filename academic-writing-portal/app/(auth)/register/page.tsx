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
import { SelectField } from "@/components/forms/select-field";
import { ROLES } from "@/lib/constants";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["student", "writer", "admin"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "student" | "writer" | "admin";
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "student" },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<RegisterResponse>("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

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
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="Create account" description="Set up your role-based access." />
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md" title="Sign up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextField
              control={control}
              name="name"
              label="Full name"
              placeholder="Jane Doe"
              required
            />
            <TextField
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="name@example.com"
              required
            />
            <SelectField
              control={control}
              name="role"
              label="Role"
              options={[
                { label: "Student", value: "student" },
                { label: "Writer", value: "writer" },
                { label: "Admin", value: "admin" },
              ]}
              placeholder="Select your role"
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
            <TextField
              control={control}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              required
            />

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <Button type="submit" variant="primary" className="w-full" loading={isLoading} disabled={formState.isSubmitting}>
              Create account
            </Button>
          </form>

          <div className="mt-5 border-t border-slate-200 pt-4 text-center text-sm">
            <span className="text-slate-600">Already have an account? </span>
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
