'use client'

import { FormEvent } from 'react'

type Props = {
  url: string
  setUrl: (url: string) => void
  loading: boolean
  onGenerate: (url: string) => void
}

const EXAMPLE_URLS = [
  'noburestaurants.com',
  'thefatduck.co.uk',
  'eater.com/restaurants',
]

export default function HeroSection({ url, setUrl, loading, onGenerate }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (url.trim()) onGenerate(url.trim())
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,126,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,126,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-sr-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sr-gold/5 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sr-card border border-sr-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-sr-gold animate-pulse-slow" />
          <span className="text-sr-muted text-xs font-medium tracking-widest uppercase">
            AI-Powered Experience Engine
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
          <span className="text-sr-text">Turn Every Table</span>
          <br />
          <span className="gold-text italic">Into a Destination.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sr-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          Enter your restaurant&apos;s website and our AI will design bespoke dining experiences,
          premium upgrades, and unforgettable events — tailored specifically to your brand.
        </p>

        {/* URL Input Form */}
        <form
          id="hero-input"
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 bg-sr-card border border-sr-border rounded-xl p-2">
            <div className="flex-1 flex items-center gap-3 px-3">
              <svg
                className="w-5 h-5 text-sr-muted flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourrestaurant.com"
                className="flex-1 bg-transparent text-sr-text placeholder-sr-muted/50 text-base focus:outline-none py-2"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className={`
                flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-sm
                transition-all duration-200 whitespace-nowrap
                ${loading || !url.trim()
                  ? 'bg-sr-gold/40 text-sr-black/60 cursor-not-allowed'
                  : 'bg-sr-gold hover:bg-sr-gold-light text-sr-black hover:shadow-lg hover:shadow-sr-gold/25 active:scale-95'
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Generate Experiences
                </>
              )}
            </button>
          </div>
        </form>

        {/* Example URLs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-sr-muted/60">Try:</span>
          {EXAMPLE_URLS.map((example) => (
            <button
              key={example}
              onClick={() => setUrl(example)}
              className="text-sr-gold/70 hover:text-sr-gold transition-colors duration-150 underline underline-offset-2 decoration-dotted"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sr-muted/40">
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-sr-border/40 bg-sr-navy/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-3 divide-x divide-sr-border/40">
          {[
            { value: '12,000+', label: 'Restaurants' },
            { value: '$2.4B+', label: 'Revenue Managed' },
            { value: '190M+', label: 'Guest Profiles' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 px-4">
              <span className="text-sr-gold font-semibold text-lg">{stat.value}</span>
              <span className="text-sr-muted text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
