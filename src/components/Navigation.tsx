import { useState, useEffect } from 'react';
import { Menu, X, Maximize, Minimize } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  onEnterWorld: () => void;
}

export default function Navigation({ onNavigate, onEnterWorld }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // Graceful handling if fullscreen permission is restricted in container
    }
  };

  const navLinks = [
    { label: 'The Legend', href: 'legend' },
    { label: 'The World', href: 'realms' },
    { label: 'Chronicles', href: 'oath' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Hairline Border & Frosted Scrim */}
      <div className="mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-8 border-b border-[#d4af37]/15 bg-[#06070a]/70 backdrop-blur-md">
        {/* Zone 1: Brand Wordmark & Celestial Seal */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group whitespace-nowrap shrink-0 cursor-pointer"
        >
          {/* Celestial Emblem / Seal */}
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 group-hover:border-[#f5df9e] flex items-center justify-center p-1 bg-[#100f0a] transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <img
              src="/images/sacred-emblem.png"
              alt="Heaven's Oath Emblem"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>

          <span className="font-display font-bold text-base sm:text-lg tracking-[0.2em] text-[#f4ecd8] group-hover:text-[#fae8b4] transition-colors">
            HEAVEN’S OATH
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-display tracking-[0.25em] uppercase text-[#b8ad96]">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#fae8b4] transition-colors relative py-1 cursor-pointer group whitespace-nowrap shrink-0"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Fullscreen Button + Primary CTA + Mobile Hamburger) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Full-screen Button: Icon-only, compact and sleek */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center border border-[#d4af37]/60 hover:border-[#f5df9e] bg-[#12110c]/80 hover:bg-[#1f1b12] text-[#f5df9e] hover:text-white transition-all duration-300 rounded-sm cursor-pointer shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] active:scale-90"
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-[#ffd700] transition-transform duration-200" />
            ) : (
              <Maximize className="w-4 h-4 text-[#ffd700] transition-transform duration-200" />
            )}
          </button>

          <a
            href="https://howps-lab.github.io/ai-lab/game/preview.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#d4af37]/60 hover:border-[#f5df9e] bg-[#12110c]/80 hover:bg-[#1f1b12] text-[#f5df9e] hover:text-white text-xs font-display tracking-[0.2em] uppercase font-semibold transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap shrink-0 gold-subtle-glow shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
          >
            <span>PLAY THE GAME</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#d4af37] hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/20 bg-[#07080c]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-left font-display text-sm tracking-[0.25em] uppercase text-[#d5cbba] hover:text-[#fae8b4] py-1 border-b border-zinc-800/60"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              toggleFullscreen();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 border border-[#d4af37]/60 bg-[#12110c]/80 text-[#f5df9e] text-xs font-display tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2"
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-[#ffd700]" />
                <span>EXIT FULLSCREEN</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-[#ffd700]" />
                <span>FULLSCREEN MODE</span>
              </>
            )}
          </button>

          <a
            href="https://howps-lab.github.io/ai-lab/game/preview.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-1 py-3 border border-[#d4af37] bg-[#1a1710] text-[#f5df9e] text-xs font-display tracking-[0.25em] uppercase font-bold text-center block shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            PLAY THE GAME
          </a>
        </div>
      )}
    </header>
  );
}
