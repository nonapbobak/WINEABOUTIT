'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sr-black/95 backdrop-blur-md border-b border-sr-border/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sr-gold flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                fill="#06080F"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Seven<span className="text-sr-gold">Rooms</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sr-muted hover:text-sr-text text-sm font-medium transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sr-muted hover:text-sr-text text-sm font-medium transition-colors duration-200"
          >
            Sign in
          </a>
          <a
            href="#hero-input"
            className="bg-sr-gold hover:bg-sr-gold-light text-sr-black text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sr-gold/20"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  )
}
