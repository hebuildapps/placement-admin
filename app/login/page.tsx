import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <section className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/15 to-background/35" />
        <div className="absolute inset-x-8 bottom-8 rounded-lg border border-primary-foreground/20 bg-background/85 p-5 text-foreground shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur">
          <p className="mt-2 text-2xl font-semibold">
            Upload, inspect, and export placement results with less friction.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        <LoginForm />
      </section>
    </div>
  );
}
