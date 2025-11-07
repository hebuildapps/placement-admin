export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-foreground font-medium mb-4">
            Admin's Dashboard - Visualize data within a website.
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <a
              href="https://github.com/hebuildapps/placement-admin"
              className="  text-muted-foreground hover:text-foreground"
            >
              Source Code
            </a>
            <a
              href="https://mitwpu.edu.in"
              className="text-muted-foreground hover:text-foreground"
            >
              College Website
            </a>
            <a
              href="#feedback"
              className="text-muted-foreground hover:text-foreground"
            >
              Feedback & Suggestions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
