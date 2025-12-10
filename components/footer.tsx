export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Grameen Songjog</h3>
            <p className="text-sm">
              Empowering villagers to report and resolve local issues through digital platforms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm space-y-1">
              <li>Submit Problems</li>
              <li>Track Status</li>
              <li>NGO Collaboration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm">Email: info@grameensongjog.org</p>
            <p className="text-sm">Help rural communities thrive</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Grameen Songjog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
