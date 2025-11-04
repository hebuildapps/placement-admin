export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-foreground font-medium mb-4">Placement Log - Share your placement journey</p>
          <div className="flex gap-6 justify-center text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Backend Repository
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Frontend Repository
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Feedback & Suggestions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
