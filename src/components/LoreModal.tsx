import { useState } from 'react';
import { X, Sparkles, Scroll, ShieldCheck, Feather } from 'lucide-react';
import { Realm, REALMS } from './RealmsSection';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRealm?: Realm | null;
}

export default function LoreModal({
  isOpen,
  onClose,
  initialRealm = null,
}: LoreModalProps) {
  const [selectedRealm, setSelectedRealm] = useState<Realm>(
    initialRealm || REALMS[0]
  );
  const [hasTakenOath, setHasTakenOath] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090b10] border border-[#d4af37]/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden gold-border-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-[#0d0f15]/90">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[#d4af37]/60 flex items-center justify-center p-0.5">
              <img
                src="/images/sacred-emblem.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display text-xs tracking-[0.25em] uppercase text-[#d4af37] block">
                The Sanctum Codex
              </span>
              <h3 id="modal-title" className="font-display text-base tracking-wide text-[#f5ebd7] font-semibold">
                CHRONICLES OF HEAVEN’S OATH
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8c8270] hover:text-[#fae8b4] hover:bg-zinc-800/50 rounded-sm transition-colors cursor-pointer"
            aria-label="Close lore codex"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Introductory Covenant Banner */}
          <div className="p-5 border border-[#d4af37]/25 bg-[#12141a]/60 rounded-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-full bg-[radial-gradient(ellipse_at_right,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="flex items-start gap-4">
              <Scroll className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-sm tracking-[0.15em] uppercase text-[#fae8b4] font-medium">
                  The Sovereign Decreed Inscription
                </h4>
                <p className="font-body italic text-base sm:text-lg text-[#ded6c4] mt-1.5 leading-relaxed">
                  “When the nine celestial pillars collapsed and the immortal thrones turned to cold iron, the saint swore upon mortal blood to bind Heaven once more.”
                </p>
              </div>
            </div>
          </div>

          {/* Realm Selector Tabs */}
          <div>
            <div className="text-xs font-display tracking-[0.2em] uppercase text-[#8c8270] mb-3">
              Select A Realm To Commune:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {REALMS.map((realm) => {
                const isCurrent = selectedRealm.id === realm.id;
                return (
                  <button
                    key={realm.id}
                    onClick={() => setSelectedRealm(realm)}
                    className={`p-3 text-left border rounded-sm transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-[#d4af37] bg-[#1a1710] text-[#f7e7c4] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'border-zinc-800 bg-[#0d0f15] text-[#8e8574] hover:border-zinc-700 hover:text-[#dcd4c3]'
                    }`}
                  >
                    <span className="font-chinese text-xs text-[#d4af37] mb-1">
                      {realm.chineseName}
                    </span>
                    <span className="font-display text-sm font-semibold tracking-wide">
                      {realm.name}
                    </span>
                    <span className="text-[11px] font-body italic text-[#b8ad96] truncate mt-1">
                      {realm.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Realm Visual & Lore Breakdown */}
          <div className="border border-zinc-800/80 rounded-sm overflow-hidden bg-[#0c0e14]">
            <div className="relative h-56 sm:h-64 w-full">
              <img
                src={selectedRealm.image}
                alt={selectedRealm.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-chinese text-sm text-[#d4af37] tracking-[0.3em] block">
                  {selectedRealm.chineseName}
                </span>
                <h4 className="font-display text-2xl text-white font-bold tracking-wide">
                  {selectedRealm.name}
                </h4>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="font-body text-base sm:text-lg text-[#ded6c4] leading-relaxed">
                {selectedRealm.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs font-display">
                <div className="p-3 bg-[#11131a] rounded-sm border border-zinc-800">
                  <span className="text-[#8a7f6c] tracking-widest uppercase block mb-1">
                    Realm Guardian
                  </span>
                  <span className="text-[#fae8b4] font-medium tracking-wide">
                    {selectedRealm.guardian}
                  </span>
                </div>
                <div className="p-3 bg-[#11131a] rounded-sm border border-zinc-800">
                  <span className="text-[#8a7f6c] tracking-widest uppercase block mb-1">
                    Divine Relic
                  </span>
                  <span className="text-[#fae8b4] font-medium tracking-wide">
                    {selectedRealm.relic}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Rite: Take the Celestial Oath */}
          <div className="p-6 border border-[#d4af37]/40 bg-gradient-to-r from-[#17140e] via-[#0f1015] to-[#17140e] rounded-sm text-center">
            {!hasTakenOath ? (
              <div className="flex flex-col items-center">
                <Feather className="w-6 h-6 text-[#d4af37] mb-2" />
                <h5 className="font-display text-base tracking-[0.18em] uppercase text-[#fae8b4] font-semibold">
                  Inscribe Your Name Upon Heaven’s Vow
                </h5>
                <p className="font-body italic text-sm text-[#b8ad96] mt-1 mb-5 max-w-md">
                  “I swear beneath the silent stars to bear the forgotten oath until the celestial gates open once more.”
                </p>
                <button
                  onClick={() => setHasTakenOath(true)}
                  className="px-6 py-2.5 bg-gradient-to-b from-[#2a2214] to-[#120f09] border border-[#d4af37] text-[#fae8b4] text-xs font-display tracking-[0.25em] uppercase font-bold rounded-sm hover:brightness-125 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  SEAL THE OATH
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
                <ShieldCheck className="w-8 h-8 text-[#d4af37] mb-2" />
                <span className="font-chinese text-sm text-[#d4af37] tracking-[0.4em] mb-1">
                  誓言已立 · 万劫不灭
                </span>
                <h5 className="font-display text-base tracking-[0.18em] uppercase text-[#fff5cc] font-bold">
                  THE OATH IS ETCHED IN SACRED GOLD
                </h5>
                <p className="font-body italic text-sm text-[#ded6c4] mt-1">
                  Your spirit is now woven into the chronicles of the Celestial Realm.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800/80 bg-[#07080c] flex items-center justify-between text-[11px] font-display text-[#716958] tracking-widest">
          <span>HEAVEN’S OATH · SANCTUM CODEX</span>
          <button
            onClick={onClose}
            className="text-[#d4af37] hover:text-white transition-colors cursor-pointer uppercase"
          >
            Close Codex
          </button>
        </div>
      </div>
    </div>
  );
}
