const SHOWCASE_ITEMS = [
  {
    category: 'Ticketed Experiences',
    color: 'gold',
    items: [
      { title: "Chef's Counter — 8 Courses", tag: 'Sold Out' },
      { title: 'Wine Cellar Dinner Series', tag: '$195/pp' },
      { title: 'Farm-to-Table Saturday', tag: '$145/pp' },
      { title: 'Truffle Season Tasting', tag: '$220/pp' },
    ],
  },
  {
    category: 'Premium Upgrades',
    color: 'purple',
    items: [
      { title: 'Welcome Champagne Toast', tag: '+$28/cover' },
      { title: 'Birthday Dessert Package', tag: '+$45/cover' },
      { title: 'Cheese Board Pairing', tag: '+$35/cover' },
      { title: 'Sommelier Wine Flight', tag: '+$65/cover' },
    ],
  },
  {
    category: 'Recurring Events',
    color: 'emerald',
    items: [
      { title: 'Jazz Dinner — First Friday', tag: 'Monthly' },
      { title: 'Winemaker Dinner Series', tag: 'Quarterly' },
      { title: 'Cooking Class: Pasta Night', tag: 'Weekly' },
      { title: 'New Year\'s Eve Gala', tag: 'Annual' },
    ],
  },
]

const COLOR_CLASSES: Record<string, { badge: string; dot: string; border: string }> = {
  gold: {
    badge: 'bg-sr-gold/10 text-sr-gold border-sr-gold/20',
    dot: 'bg-sr-gold',
    border: 'border-sr-gold/20',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dot: 'bg-purple-400',
    border: 'border-purple-500/20',
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/20',
  },
}

export default function ExperienceShowcase() {
  return (
    <section className="py-24 px-6 bg-sr-navy/40 border-y border-sr-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sr-gold text-xs font-semibold tracking-widest uppercase mb-3">
            What Restaurants Create
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sr-text leading-tight">
            Every restaurant is different.
            <br />
            <span className="italic text-sr-muted">Every plan should be too.</span>
          </h2>
          <p className="text-sr-muted text-base mt-4 max-w-xl mx-auto">
            Our AI doesn&apos;t generate generic templates — it reads your actual restaurant
            and builds ideas that could only exist at your place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASE_ITEMS.map((section) => {
            const colors = COLOR_CLASSES[section.color]
            return (
              <div
                key={section.category}
                className="bg-sr-card border border-sr-border rounded-2xl overflow-hidden"
              >
                {/* Section header */}
                <div className={`px-5 py-3 border-b border-sr-border flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className="text-sr-text text-sm font-semibold">{section.category}</span>
                </div>
                {/* Items */}
                <div className="p-4 space-y-2.5">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between bg-sr-black/40 border ${colors.border} rounded-lg px-4 py-3`}
                    >
                      <span className="text-sr-text text-sm font-medium">{item.title}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Footer hint */}
                <div className="px-5 pb-4">
                  <p className="text-sr-muted/50 text-xs text-center">
                    AI generates 4 unique ideas for each category
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
