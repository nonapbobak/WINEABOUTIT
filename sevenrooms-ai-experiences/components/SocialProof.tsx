const TESTIMONIALS = [
  {
    quote:
      "We launched our Chef's Counter experience using SevenRooms and sold out 3 months in advance. The AI suggestions were spot-on for our concept.",
    name: 'Maria Chen',
    role: 'Executive Chef & Owner',
    restaurant: 'Parallax, San Francisco',
    initials: 'MC',
  },
  {
    quote:
      'The wine pairing upgrade alone added $58 to our average check. It took 20 minutes to set up. I wish we had done this years ago.',
    name: 'James Whitfield',
    role: 'General Manager',
    restaurant: 'The Larder, Chicago',
    initials: 'JW',
  },
  {
    quote:
      'Our monthly winemaker dinners are now our highest-rated experience on every review platform. Guests plan trips around them.',
    name: 'Sofia Reyes',
    role: 'Director of Hospitality',
    restaurant: 'Marisol, Miami',
    initials: 'SR',
  },
]

const LOGOS = ['Nobu', 'Le Bernardin', 'Eleven Madison Park', 'Alinea', 'Zuma', 'Coya', 'Boka', 'Carbone']

export default function SocialProof() {
  return (
    <section className="py-24 px-6 border-t border-sr-border/40">
      <div className="max-w-6xl mx-auto">
        {/* Logo strip */}
        <div className="text-center mb-16">
          <p className="text-sr-muted/50 text-xs tracking-widest uppercase mb-6">
            Trusted by world-class restaurants
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {LOGOS.map((name) => (
              <span key={name} className="text-sr-muted/30 font-semibold text-sm tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-sr-card border border-sr-border rounded-2xl p-7 flex flex-col gap-5 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-sr-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sr-muted text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-sr-border">
                <div className="w-9 h-9 rounded-full bg-sr-gold/20 border border-sr-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sr-gold text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sr-text text-sm font-semibold">{t.name}</p>
                  <p className="text-sr-muted/60 text-xs">{t.role} · {t.restaurant}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
