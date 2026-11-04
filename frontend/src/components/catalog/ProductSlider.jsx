import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSlider({
  products = [],
  title = "Related Products",
  subtitle = "Handpicked fresh picks for you",
  badge = "Recommendations",
  autoPlay = false,
  autoPlayInterval = 4000,
}) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  // Auto-play / Moving carousel feature
  useEffect(() => {
    if (!autoPlay || isPaused || products.length === 0) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
      checkScroll();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, products, autoPlayInterval]);

  if (!products || products.length === 0) return null;

  return (
    <div
      className="my-10 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header with Title and Slider Controls */}
      <div className="flex items-end justify-between mb-5 px-1">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full mb-1.5 border border-primary-200/60">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        {/* Carousel Arrow Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous products"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border transition-all duration-200 shadow-xs ${
              canScrollLeft
                ? 'bg-white border-gray-200 text-gray-800 hover:bg-primary-700 hover:text-white hover:border-primary-700 hover:shadow-md active:scale-95'
                : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next products"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border transition-all duration-200 shadow-xs ${
              canScrollRight
                ? 'bg-white border-gray-200 text-gray-800 hover:bg-primary-700 hover:text-white hover:border-primary-700 hover:shadow-md active:scale-95'
                : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Smooth Slider Track */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            className="flex-shrink-0 w-[240px] sm:w-[270px] snap-start transition-transform duration-300 hover:-translate-y-1"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Subtle indicator bar */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <span className="text-[11px] font-semibold text-gray-400">
          Showing {products.length} products • Swipe or use arrows to navigate
        </span>
      </div>
    </div>
  );
}
