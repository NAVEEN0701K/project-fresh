import { useMemo } from 'react';

// SVGs for Fruits
function OrangeSliceIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FB923C" fillOpacity="0.25" stroke="#F97316" strokeWidth="4" />
      <circle cx="50" cy="50" r="38" fill="#FDBA74" fillOpacity="0.3" stroke="#FED7AA" strokeWidth="3" />
      <path d="M50 50 L50 16 M50 50 L78 26 M50 50 L84 50 M50 50 L78 74 M50 50 L50 84 M50 50 L22 74 M50 50 L16 50 M50 50 L22 26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="6" fill="#F97316" />
    </svg>
  );
}

function AppleIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 30 C40 18 20 22 20 45 C20 72 45 88 50 88 C55 88 80 72 80 45 C80 22 60 18 50 30 Z" fill="#EF4444" fillOpacity="0.25" stroke="#DC2626" strokeWidth="3" />
      <path d="M50 30 C50 18 58 12 62 10" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <path d="M53 18 C65 14 68 24 53 25" fill="#22C55E" fillOpacity="0.6" stroke="#16A34A" strokeWidth="2" />
    </svg>
  );
}

function StrawberryIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 28 C28 28 22 55 35 75 C42 85 50 92 50 92 C50 92 58 85 65 75 C78 55 72 28 50 28 Z" fill="#F43F5E" fillOpacity="0.25" stroke="#E11D48" strokeWidth="3" />
      {/* Leaves */}
      <path d="M50 28 C42 16 35 22 36 28 M50 28 C50 14 56 14 56 26 M50 28 C58 16 65 22 64 28" fill="#16A34A" fillOpacity="0.6" stroke="#15803D" strokeWidth="2" />
      {/* Seeds */}
      <circle cx="42" cy="45" r="2" fill="#FDE047" />
      <circle cx="58" cy="45" r="2" fill="#FDE047" />
      <circle cx="50" cy="58" r="2" fill="#FDE047" />
      <circle cx="40" cy="68" r="2" fill="#FDE047" />
      <circle cx="60" cy="68" r="2" fill="#FDE047" />
    </svg>
  );
}

function WatermelonSliceIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 35 C35 85 65 85 85 35 Z" fill="#EF4444" fillOpacity="0.25" stroke="#15803D" strokeWidth="6" />
      <path d="M22 38 C38 78 62 78 78 38 Z" fill="#F87171" fillOpacity="0.3" stroke="#86EFAC" strokeWidth="3" />
      {/* Seeds */}
      <ellipse cx="40" cy="50" rx="2" ry="3" fill="#1F2937" fillOpacity="0.7" />
      <ellipse cx="50" cy="60" rx="2" ry="3" fill="#1F2937" fillOpacity="0.7" />
      <ellipse cx="60" cy="50" rx="2" ry="3" fill="#1F2937" fillOpacity="0.7" />
    </svg>
  );
}

function GrapesIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 C50 12 55 10 60 8" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 16 C30 14 32 24 45 22" fill="#22C55E" fillOpacity="0.6" stroke="#16A34A" strokeWidth="2" />
      {/* Grapes */}
      <circle cx="42" cy="32" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="58" cy="32" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="34" cy="48" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="50" cy="48" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="66" cy="48" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="42" cy="64" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="58" cy="64" r="10" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="50" cy="78" r="9" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="2" />
    </svg>
  );
}

// SVGs for Vegetables
function TomatoIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#EF4444" fillOpacity="0.25" stroke="#DC2626" strokeWidth="3" />
      <path d="M50 25 L50 16 M50 25 L38 20 M50 25 L62 20 M50 25 L42 30 M50 25 L58 30" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CarrotIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M35 30 C65 25 70 35 65 45 L50 88 C48 92 46 92 44 88 L30 45 C28 35 30 30 35 30 Z" fill="#F97316" fillOpacity="0.25" stroke="#EA580C" strokeWidth="3" />
      <path d="M38 45 L48 44 M35 60 L45 58 M40 75 L46 74" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      {/* Greens */}
      <path d="M48 30 C45 15 40 10 38 8 M48 30 C50 12 52 10 52 8 M48 30 C55 15 60 12 62 10" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BroccoliIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M45 55 L42 85 C42 88 58 88 58 85 L55 55 Z" fill="#86EFAC" fillOpacity="0.3" stroke="#16A34A" strokeWidth="3" />
      {/* Crown */}
      <circle cx="35" cy="45" r="16" fill="#22C55E" fillOpacity="0.25" stroke="#15803D" strokeWidth="3" />
      <circle cx="65" cy="45" r="16" fill="#22C55E" fillOpacity="0.25" stroke="#15803D" strokeWidth="3" />
      <circle cx="50" cy="34" r="18" fill="#16A34A" fillOpacity="0.25" stroke="#15803D" strokeWidth="3" />
      <circle cx="42" cy="48" r="12" fill="#22C55E" fillOpacity="0.25" />
      <circle cx="58" cy="48" r="12" fill="#22C55E" fillOpacity="0.25" />
    </svg>
  );
}

function LeafIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M25 75 C25 75 35 25 78 22 C78 22 75 68 25 75 Z" fill="#10B981" fillOpacity="0.25" stroke="#059669" strokeWidth="3" />
      <path d="M25 75 L65 35 M40 60 L55 58 M50 50 L65 47" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// SVGs for Flowers
function RoseIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="38" fill="#FB7185" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="3" />
      <path d="M50 25 C65 25 72 38 68 52 C65 65 52 75 38 72 C25 68 22 52 28 38 C32 28 42 25 50 25 Z" fill="#F43F5E" fillOpacity="0.25" stroke="#E11D48" strokeWidth="2.5" />
      <path d="M50 35 C58 35 62 42 60 50 C58 58 50 62 42 60 C35 58 32 50 35 42 C38 35 45 35 50 35 Z" fill="#E11D48" fillOpacity="0.3" stroke="#BE123C" strokeWidth="2" />
      <circle cx="50" cy="48" r="6" fill="#BE123C" fillOpacity="0.4" />
    </svg>
  );
}

function SunflowerIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Golden Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="22"
          rx="6"
          ry="16"
          fill="#FBBF24"
          fillOpacity="0.35"
          stroke="#F59E0B"
          strokeWidth="1.5"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* Seed center */}
      <circle cx="50" cy="50" r="20" fill="#78350F" fillOpacity="0.35" stroke="#92400E" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="14" fill="#451A03" fillOpacity="0.4" />
    </svg>
  );
}

function TulipIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 55 L50 90" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 75 C40 68 35 58 36 50" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      {/* Bloom */}
      <path d="M30 40 C30 60 50 65 50 65 C50 65 70 60 70 40 C65 32 58 35 50 48 C42 35 35 32 30 40 Z" fill="#EC4899" fillOpacity="0.25" stroke="#DB2777" strokeWidth="3" />
      <path d="M42 42 C45 28 55 28 58 42 C54 48 46 48 42 42 Z" fill="#F472B6" fillOpacity="0.35" stroke="#DB2777" strokeWidth="2" />
    </svg>
  );
}

function PetalIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M25 5 C15 15 10 30 25 45 C40 30 35 15 25 5 Z" fill="#FB7185" fillOpacity="0.35" stroke="#F43F5E" strokeWidth="1.5" />
    </svg>
  );
}

export default function CategoryThemedBackground({ category = 'all' }) {
  const normCategory = useMemo(() => {
    if (!category) return 'all';
    const c = category.toLowerCase();
    if (c.includes('fruit')) return 'fruits';
    if (c.includes('veg')) return 'vegetables';
    if (c.includes('flower')) return 'flowers';
    return 'all';
  }, [category]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-all duration-700 select-none"
    >
      {/* ===== FRUITS BACKGROUND ===== */}
      {normCategory === 'fruits' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-yellow-50/50 animate-fade-in">
          {/* Ambient Glowing Orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-300/20 to-amber-200/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-rose-300/15 to-orange-300/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-300/15 to-amber-300/15 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

          {/* Floating Fruit Elements Across Screen */}
          <div className="absolute top-16 left-6 animate-float" style={{ animationDuration: '6s' }}>
            <AppleIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-35" />
          </div>
          <div className="absolute top-28 right-8 animate-float-slow" style={{ animationDuration: '7s' }}>
            <OrangeSliceIcon className="w-24 h-24 sm:w-36 sm:h-36 opacity-35" />
          </div>
          <div className="absolute top-1/2 left-8 animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}>
            <StrawberryIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-35" />
          </div>
          <div className="absolute top-2/3 right-12 animate-float-slow" style={{ animationDelay: '1.2s' }}>
            <WatermelonSliceIcon className="w-28 h-28 sm:w-40 sm:h-40 opacity-30" />
          </div>
          <div className="absolute bottom-16 left-1/3 animate-float" style={{ animationDelay: '2.5s' }}>
            <GrapesIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-30" />
          </div>
          <div className="absolute bottom-24 right-1/4 animate-float-slow" style={{ animationDelay: '0.8s' }}>
            <OrangeSliceIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-25" />
          </div>

          {/* Large Corner Watermark Banner */}
          <div className="absolute -bottom-16 -right-16 opacity-10">
            <AppleIcon className="w-72 h-72" />
          </div>
        </div>
      )}

      {/* ===== VEGETABLES BACKGROUND ===== */}
      {normCategory === 'vegetables' && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/75 via-green-50/40 to-teal-50/50 animate-fade-in">
          {/* Ambient Glowing Orbs */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-300/20 to-green-200/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-teal-300/15 to-emerald-300/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-green-300/15 to-lime-300/15 blur-3xl animate-float-slow" style={{ animationDelay: '1s' }} />

          {/* Floating Vegetable Elements */}
          <div className="absolute top-16 left-8 animate-float" style={{ animationDuration: '6s' }}>
            <TomatoIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-35" />
          </div>
          <div className="absolute top-24 right-10 animate-float-slow" style={{ animationDuration: '7s' }}>
            <CarrotIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-35" />
          </div>
          <div className="absolute top-1/2 right-6 animate-float" style={{ animationDelay: '1.5s', animationDuration: '8s' }}>
            <BroccoliIcon className="w-24 h-24 sm:w-36 sm:h-36 opacity-35" />
          </div>
          <div className="absolute top-2/3 left-10 animate-float-slow" style={{ animationDelay: '2s' }}>
            <LeafIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-35" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: '0.5s' }}>
            <TomatoIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-30" />
          </div>
          <div className="absolute bottom-16 right-1/3 animate-float-slow" style={{ animationDelay: '2.5s' }}>
            <CarrotIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-30" />
          </div>

          {/* Large Corner Watermark */}
          <div className="absolute -bottom-16 -left-16 opacity-10">
            <BroccoliIcon className="w-72 h-72" />
          </div>
        </div>
      )}

      {/* ===== FLOWERS BACKGROUND ===== */}
      {normCategory === 'flowers' && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/70 via-pink-50/45 to-fuchsia-50/40 animate-fade-in">
          {/* Ambient Floral Glow Orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-rose-300/20 to-pink-200/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-fuchsia-300/15 to-rose-300/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/15 to-rose-300/15 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

          {/* Floating Flower Elements */}
          <div className="absolute top-14 left-8 animate-float" style={{ animationDuration: '6s' }}>
            <RoseIcon className="w-24 h-24 sm:w-36 sm:h-36 opacity-35" />
          </div>
          <div className="absolute top-24 right-10 animate-float-slow" style={{ animationDuration: '7s' }}>
            <SunflowerIcon className="w-24 h-24 sm:w-36 sm:h-36 opacity-35" />
          </div>
          <div className="absolute top-1/2 left-6 animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}>
            <TulipIcon className="w-20 h-20 sm:w-32 sm:h-32 opacity-35" />
          </div>
          <div className="absolute top-2/3 right-8 animate-float-slow" style={{ animationDelay: '1.2s' }}>
            <RoseIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-35" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2.5s' }}>
            <SunflowerIcon className="w-20 h-20 sm:w-28 sm:h-28 opacity-30" />
          </div>

          {/* Drifting Petals */}
          <div className="absolute top-20 left-1/2 animate-float" style={{ animationDelay: '0.8s' }}>
            <PetalIcon className="w-10 h-10 opacity-40 rotate-12" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-slow" style={{ animationDelay: '2.2s' }}>
            <PetalIcon className="w-8 h-8 opacity-35 -rotate-45" />
          </div>
          <div className="absolute bottom-36 right-1/3 animate-float" style={{ animationDelay: '1.6s' }}>
            <PetalIcon className="w-11 h-11 opacity-40 rotate-45" />
          </div>

          {/* Large Floral Watermark */}
          <div className="absolute -bottom-16 -right-16 opacity-10">
            <RoseIcon className="w-72 h-72" />
          </div>
        </div>
      )}

      {/* ===== DEFAULT / ALL BACKGROUND ===== */}
      {normCategory === 'all' && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/40">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-200/10 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-green-200/10 blur-3xl animate-float" />
        </div>
      )}
    </div>
  );
}
