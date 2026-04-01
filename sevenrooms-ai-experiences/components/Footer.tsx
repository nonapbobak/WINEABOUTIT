const LINKS = {
  Product: ['Reservations', 'Guest Profiles', 'Marketing', 'Analytics', 'Experiences'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Help Center', 'API Docs', 'Status', 'Partners', 'Security'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="border-t border-sr-border/40 bg-sr-black pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sr-gold flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#06080F" />
                </svg>
              </div>
              <span className="text-white font-semibold text-base">
                Seven<span className="text-sr-gold">Rooms</span>
              </span>
            </div>
            <p className="text-sr-muted/60 text-xs leading-relaxed">
              The hospitality platform that transforms restaurants into unforgettable destinations.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sr-text text-xs font-semibold uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sr-muted/60 hover:text-sr-muted text-sm transition-colors duration-150">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-sr-border/40 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sr-muted/40 text-xs">
            © {new Date().getFullYear()} SevenRooms, Inc. All rights reserved.
          </p>
          <p className="text-sr-muted/30 text-xs">
            AI-powered experience generator · Built with Claude
          </p>
        </div>
      </div>
    </footer>
  )
}
