import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-play carousel (5 second interval)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Cards Container */}
      <div className="relative h-[360px] md:h-[280px]">
        {testimonials.map((testimonial, i) => {
          const isActive = i === activeIndex;
          const isPrev =
            i === (activeIndex - 1 + testimonials.length) % testimonials.length;
          const isNext = i === (activeIndex + 1) % testimonials.length;

          let transformClasses =
            "translate-x-0 scale-75 opacity-0 z-0 pointer-events-none";
          if (isActive)
            transformClasses = "translate-x-0 scale-100 opacity-100 z-20";
          else if (isPrev)
            transformClasses =
              "-translate-x-[80%] scale-90 opacity-40 z-10 pointer-events-none";
          else if (isNext)
            transformClasses =
              "translate-x-[80%] scale-90 opacity-40 z-10 pointer-events-none";

          return (
            <div
              key={i}
              className={`absolute inset-0 rounded-xl border-2 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm transition-all duration-500 ease-out ${transformClasses} ${
                isActive
                  ? "border-[hsl(var(--primary)/0.3)] shadow-xl"
                  : "border-transparent"
              }`}
            >
              <div className="p-8 h-full flex flex-col justify-between">
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`h-5 w-5 fill-[hsl(var(--primary))] text-[hsl(var(--primary))] transition-all duration-300 ${
                          isActive ? "animate-bounce-subtle" : ""
                        }`}
                        style={{ animationDelay: `${j * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author */}
                <div className="border-t border-[hsl(var(--border))] pt-4 mt-6 flex items-center gap-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[hsl(var(--primary))] font-bold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {testimonial.role} &bull; {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
        <button
          onClick={prevSlide}
          className="pointer-events-auto rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.8)] backdrop-blur-sm hover:bg-[hsl(var(--background))] shadow-lg transition-all hover:scale-110 h-10 w-10 flex items-center justify-center"
          aria-label="Vorheriges Testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.8)] backdrop-blur-sm hover:bg-[hsl(var(--background))] shadow-lg transition-all hover:scale-110 h-10 w-10 flex items-center justify-center"
          aria-label="Naechstes Testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-[hsl(var(--primary))]"
                : "w-2 bg-[hsl(var(--muted-foreground)/0.3)] hover:bg-[hsl(var(--muted-foreground)/0.5)]"
            }`}
            aria-label={`Testimonial ${i + 1} anzeigen`}
          />
        ))}
      </div>
    </div>
  );
}
