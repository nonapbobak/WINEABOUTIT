export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter your restaurant URL',
      description:
        'Paste your restaurant website link. Our AI reads your menu, atmosphere, cuisine, and brand identity to understand what makes you unique.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI builds your experience plan',
      description:
        "Claude analyzes your restaurant's identity and generates bespoke experiences, premium upgrades, and recurring events tailored to your exact brand.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Launch on SevenRooms',
      description:
        'Take your AI-generated plan and bring it to life. SevenRooms handles bookings, payments, guest communications, and data — end to end.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-24 px-6 border-t border-sr-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sr-gold text-xs font-semibold tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sr-text leading-tight">
            From URL to unforgettable
            <br />
            <span className="italic text-sr-muted">in under 60 seconds.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-sr-border to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative mb-6">
                {/* Circle with icon */}
                <div className="w-16 h-16 rounded-2xl bg-sr-card border border-sr-border flex items-center justify-center text-sr-gold relative z-10">
                  {step.icon}
                </div>
                {/* Step number */}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sr-gold text-sr-black text-xs font-bold flex items-center justify-center z-20">
                  {i + 1}
                </span>
              </div>
              <div className="text-sr-border/40 font-display text-6xl font-bold absolute top-0 left-0 select-none opacity-30">
                {step.number}
              </div>
              <h3 className="text-sr-text font-semibold text-lg mb-2 relative z-10">{step.title}</h3>
              <p className="text-sr-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
