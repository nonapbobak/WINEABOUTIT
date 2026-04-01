'use client'

import type { ExperienceResult, Experience, Upgrade, EventSuggestion } from '@/app/page'

type Props = {
  loading: boolean
  results: ExperienceResult | null
  error: string | null
  onRetry: () => void
}

const ICON_MAP: Record<string, JSX.Element> = {
  chef: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 21H9m6 0v-3.375c0-.621-.503-1.125-1.125-1.125H10.125A1.125 1.125 0 009 17.625V21m6 0h.008v.008H15V21zm-6 0h.008v.008H9V21z" />
    </svg>
  ),
  wine: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-1.985 2.24c-2.5.26-5.13.26-7.63 0A2.25 2.25 0 018.2 15m11.6 0H4.2" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  fire: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  leaf: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15H16.5a2.25 2.25 0 00-2.25 2.25v.906m4.5-3.125l.174.523" />
    </svg>
  ),
  sparkle: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  gift: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 109.375 7.5H12m0 0H7.5m4.5 0h4.5m-9 0H5.625A1.875 1.875 0 003.75 9.375M12 7.5h6.375A1.875 1.875 0 0120.25 9.375m0 0v2.625M3.75 9.375v2.625m0 0h16.5m-16.5 0A1.875 1.875 0 002.25 12v1.5" />
    </svg>
  ),
  champagne: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-1.985 2.24" />
    </svg>
  ),
  music: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  moon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  trophy: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125V18.75m9-9H18a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-1.5M6 9.75H3.75A2.25 2.25 0 011.5 7.5V6.75A2.25 2.25 0 013.75 4.5H6M6 9.75V4.5m0 5.25h12M6 4.5h12" />
    </svg>
  ),
}

function getIcon(name: string) {
  return ICON_MAP[name] || ICON_MAP['sparkle']
}

function SkeletonCard() {
  return (
    <div className="bg-sr-card border border-sr-border rounded-xl p-6 space-y-3">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 shimmer rounded w-3/4" />
          <div className="h-3 shimmer rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 shimmer rounded w-full" />
        <div className="h-3 shimmer rounded w-5/6" />
        <div className="h-3 shimmer rounded w-4/6" />
      </div>
      <div className="h-6 shimmer rounded-full w-24 mt-3" />
    </div>
  )
}

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <div
      className="bg-sr-card border border-sr-border rounded-xl p-6 card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-sr-gold/10 border border-sr-gold/20 flex items-center justify-center text-sr-gold flex-shrink-0">
          {getIcon(item.icon)}
        </div>
        <div>
          <h4 className="text-sr-text font-semibold text-base leading-tight">{item.title}</h4>
          <span className="text-xs text-sr-muted/70 font-medium uppercase tracking-wider">{item.category}</span>
        </div>
      </div>
      <p className="text-sr-muted text-sm leading-relaxed mb-4">{item.description}</p>
      <div className="inline-flex items-center gap-1.5 bg-sr-gold/10 border border-sr-gold/20 rounded-full px-3 py-1">
        <svg className="w-3 h-3 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sr-gold text-xs font-semibold">{item.priceRange}</span>
      </div>
    </div>
  )
}

function UpgradeCard({ item, index }: { item: Upgrade; index: number }) {
  return (
    <div
      className="bg-sr-card border border-sr-border rounded-xl p-6 card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
          {getIcon(item.icon)}
        </div>
        <div className="flex-1">
          <h4 className="text-sr-text font-semibold text-base leading-tight">{item.title}</h4>
        </div>
      </div>
      <p className="text-sr-muted text-sm leading-relaxed mb-4">{item.description}</p>
      <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 w-fit">
        <svg className="w-3 h-3 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
        <span className="text-purple-400 text-xs font-semibold">{item.revenueBoost}</span>
      </div>
    </div>
  )
}

function EventCard({ item, index }: { item: EventSuggestion; index: number }) {
  return (
    <div
      className="bg-sr-card border border-sr-border rounded-xl p-6 card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
          {getIcon(item.icon)}
        </div>
        <div className="flex-1">
          <h4 className="text-sr-text font-semibold text-base leading-tight">{item.title}</h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-emerald-400/70 font-medium">{item.frequency}</span>
            <span className="text-sr-border">·</span>
            <span className="text-xs text-sr-muted/60">{item.estimatedAttendees}</span>
          </div>
        </div>
      </div>
      <p className="text-sr-muted text-sm leading-relaxed">{item.description}</p>
    </div>
  )
}

export default function ResultsSection({ loading, results, error, onRetry }: Props) {
  if (error) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-sr-text font-semibold text-lg mb-2">Unable to generate experiences</h3>
          <p className="text-sr-muted text-sm mb-6">{error}</p>
          <button
            onClick={onRetry}
            className="bg-sr-gold hover:bg-sr-gold-light text-sr-black font-semibold px-6 py-2.5 rounded-lg transition-all duration-200"
          >
            Try again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 border-t border-sr-border/40">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-sr-card border border-sr-border rounded-full px-5 py-2.5 mb-6">
                <svg className="w-4 h-4 text-sr-gold animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sr-muted text-sm">AI is analyzing your restaurant...</span>
              </div>
              <div className="h-8 shimmer rounded w-96 mx-auto mb-3" />
              <div className="h-4 shimmer rounded w-64 mx-auto" />
            </div>
            <div className="space-y-12">
              {['Experiences', 'Upgrades', 'Events'].map((section) => (
                <div key={section}>
                  <div className="h-6 shimmer rounded w-40 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : results ? (
          <>
            {/* Header */}
            <div className="text-center mb-14 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <div className="inline-flex items-center gap-2 bg-sr-card border border-sr-gold/20 rounded-full px-4 py-1.5 mb-5">
                <svg className="w-4 h-4 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <span className="text-sr-gold text-xs font-medium tracking-wider uppercase">AI Analysis Complete</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-sr-text mb-3">
                Your Personalized Experience Plan
              </h2>
              <p className="text-sr-muted text-base max-w-xl mx-auto">
                <span className="text-sr-gold font-medium">{results.restaurantName}</span>
                {' — '}
                {results.restaurantSummary}
              </p>
            </div>

            {/* Experiences */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sr-gold/10 border border-sr-gold/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sr-text font-semibold text-lg">Signature Experiences</h3>
                  <p className="text-sr-muted text-xs">Unique dining concepts that guests will book months in advance</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.experiences.map((item, i) => (
                  <ExperienceCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Upgrades */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sr-text font-semibold text-lg">Premium Upgrades</h3>
                  <p className="text-sr-muted text-xs">Add-ons that increase average check size and guest satisfaction</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.upgrades.map((item, i) => (
                  <UpgradeCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sr-text font-semibold text-lg">Recurring Events</h3>
                  <p className="text-sr-muted text-xs">Scheduled programming that builds a loyal, repeat-visit audience</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.events.map((item, i) => (
                  <EventCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* CTA after results */}
            <div className="mt-14 text-center bg-sr-card border border-sr-border rounded-2xl p-10">
              <h3 className="font-display text-2xl font-bold text-sr-text mb-2">
                Ready to launch these experiences?
              </h3>
              <p className="text-sr-muted text-sm mb-6 max-w-md mx-auto">
                SevenRooms gives you the tools to create, manage, and sell every one of these —
                from ticketed events to premium add-ons.
              </p>
              <button className="bg-sr-gold hover:bg-sr-gold-light text-sr-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sr-gold/25">
                Start your free trial
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
