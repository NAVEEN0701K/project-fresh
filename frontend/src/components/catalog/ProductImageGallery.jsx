import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function ProductImageGallery({
  images = [],
  productName = 'Product',
  discount = 0,
  isSeasonal = false,
  isFeatured = false,
  onShare,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const fallback = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80';
  const validImages = images && images.length > 0 ? images : [fallback];

  // Auto-play Image Carousel
  useEffect(() => {
    if (!isPlaying || validImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying, validImages.length]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  // Touch Swipe Handlers for mobile
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div className="space-y-4">
      {/* ===== MAIN IMAGE CAROUSEL / SLIDER STAGE ===== */}
      <div
        className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md group select-none aspect-square sm:aspect-[4/3] max-h-[460px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Animated Sliding Container */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {validImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-green-50/50 to-emerald-50/30"
            >
              <img
                src={imgSrc}
                alt={`${productName} view ${idx + 1}`}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 hover:scale-105"
                onClick={() => setIsZoomOpen(true)}
                onError={(e) => {
                  e.target.src = fallback;
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -{discount}% OFF
            </span>
          )}
          {isFeatured && (
            <span className="bg-gradient-to-r from-primary-700 to-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Featured Pick
            </span>
          )}
          {isSeasonal && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Seasonal Fresh
            </span>
          )}
        </div>

        {/* Top Right Action Buttons (Share + Fullscreen Zoom) */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
          {validImages.length > 1 && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-gray-700 hover:text-primary-700 hover:bg-white transition-all active:scale-90"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-primary-700" /> : <Play className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => setIsZoomOpen(true)}
            title="Expand Fullscreen"
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-gray-700 hover:text-primary-700 hover:bg-white transition-all active:scale-90"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          {onShare && (
            <button
              onClick={onShare}
              title="Share Product"
              className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-gray-700 hover:text-primary-700 hover:bg-white transition-all active:scale-90"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Previous & Next Carousel Buttons */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-gray-800 flex items-center justify-center hover:bg-white hover:text-primary-700 transition-all duration-200 active:scale-90 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-gray-800 flex items-center justify-center hover:bg-white hover:text-primary-700 transition-all duration-200 active:scale-90 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Slide Indicator Bar */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold flex items-center gap-2">
          <span>
            {currentIndex + 1} / {validImages.length}
          </span>
          {isPlaying && (
            <span className="flex items-center gap-1 text-[10px] text-green-300">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              Auto
            </span>
          )}
        </div>
      </div>

      {/* ===== THUMBNAIL CAROUSEL RAIL ===== */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 px-0.5 no-scrollbar">
          {validImages.map((imgSrc, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 relative ${
                currentIndex === idx
                  ? 'border-primary-600 ring-2 ring-primary-300/60 scale-105 shadow-md'
                  : 'border-gray-200 opacity-65 hover:opacity-100 hover:border-gray-300'
              }`}
            >
              <img
                src={imgSrc}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallback;
                }}
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 bg-primary-600/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ===== FULLSCREEN LIGHTBOX MODAL ===== */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Large image view */}
          <div
            className="max-w-4xl max-h-[80vh] w-full relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validImages[currentIndex]}
              alt={productName}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl animate-zoom-in"
            />

            {/* Arrows inside lightbox */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          <p className="text-white/60 text-xs mt-4">
            {productName} • Image {currentIndex + 1} of {validImages.length}
          </p>
        </div>
      )}
    </div>
  );
}
