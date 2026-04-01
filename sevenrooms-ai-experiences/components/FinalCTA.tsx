'use client'

import { FormEvent } from 'react'

type Props = {
  url: string
  setUrl: (url: string) => void
  loading: boolean
  onGenerate: (url: string) => void
}

export default function FinalCTA({ url, setUrl, loading, onGenerate }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onGenerate(url.trim())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-24 px-6 bg-sr-navy/60 border-t border-sr-border/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-sr-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-sr-gold/10 border border-sr-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-sr-text mb-4 leading-tight">
          Your restaurant deserves
          <br />
          <span className="gold-text italic">to be an experience.</span>
        </h2>

        <p className="text-sr-muted text-lg mb-10 leading-relaxed">
          Enter your restaurant URL below and let AI design your experience strategy in seconds.
          No credit card. No commitment. Just ideas worth pursuing.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-sr-card border border-sr-border rounded-xl p-2">
            <div className="flex-1 flex items-center gap-3 px-3">
              <svg className="w-4 h-4 text-sr-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
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
                flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
                transition-all duration-200 whitespace-nowrap
                ${loading || !url.trim()
                  ? 'bg-sr-gold/40 text-sr-black/60 cursor-not-allowed'
                  : 'bg-sr-gold hover:bg-sr-gold-light text-sr-black hover:shadow-lg hover:shadow-sr-gold/25 active:scale-95'
                }
              `}
            >
              {loading ? 'Analyzing...' : 'Generate for free'}
            </button>
          </div>
        </form>

        <p className="text-sr-muted/40 text-xs mt-4">
          Powered by Claude AI · No signup required · Results in ~15 seconds
        </p>
      </div>
    </section>
  )
}
