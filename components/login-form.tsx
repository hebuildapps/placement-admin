"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  setError(null);

  if (
    email !== "admin@school.edu.in" ||
    password !== "87654321"
  ) {
    setError("Invalid email or password.");
    setIsLoading(false);
    return;
  }

  router.push("/dashboard");
};

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-lexend font-semibold  tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Review campus outcomes, upload placement sheets, and export the latest
          dashboard snapshot.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-card p-5"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email" className="text-foreground">Email</FieldLabel>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@school.edu.in"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="text-foreground">Password</FieldLabel>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </Field>
          {error && (
            <Field>
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            </Field>
          )}
          <Field>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Opening dashboard..." : "Sign in with email"}
              <ArrowRight className="size-4" />
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="group relative inline-flex items-center pr-4 text-xs font-medium text-muted-foreground transition-all duration-200"
        >
          Need quick access?

          <span className="ml-1 underline underline-offset-[3px] decoration-[2px] decoration-emerald-400 decoration-opacity-60 transition-all duration-200 group-hover:brightness-125 group-hover:decoration-opacity-100">
            access
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="absolute right-0 h-3.5 w-3.5 fill-current text-emerald-400 opacity-0 translate-y-[4px] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="4"
              d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
