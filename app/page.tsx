import { LoginForm } from "@/components/login-form";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <section className="relative hidden overflow-hidden bg-primary lg:block">
          <img
            src="/placements.jpg"
            alt="Placement dashboard preview"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/15 to-background/35" />
        </section>
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
