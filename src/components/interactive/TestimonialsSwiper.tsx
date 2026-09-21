import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { testimonials, type TestimonialMetric } from "../../data/testimonials";

// Zaehlt eine Zahl hoch, sobald die Karte im Viewport ist. Text steht sofort.
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = 0;
    let frame = 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function MetricValue({ metric }: { metric: TestimonialMetric }) {
  const tone = metric.direction === "up" ? "text-primary" : "text-success";
  if (typeof metric.value === "number") {
    return (
      <span className={`text-4xl font-display font-bold leading-none ${tone}`}>
        <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
      </span>
    );
  }
  return (
    <span className={`text-2xl font-display font-bold leading-tight ${tone}`}>
      {metric.prefix}
      {metric.value}
      {metric.suffix}
    </span>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function TestimonialsSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        modules={[FreeMode]}
        spaceBetween={24}
        slidesPerView="auto"
        slidesOffsetAfter={32}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.8,
          momentumVelocityRatio: 0.8,
        }}
        grabCursor={true}
        onSwiper={setSwiper}
        onSlideChange={(s: SwiperType) => setActiveIndex(s.activeIndex)}
        className="!px-5 md:!px-8 !pb-4 [&_.swiper-wrapper]:!items-stretch"
      >
        {testimonials.map((t) => {
          const isDown = t.metric.direction === "down";
          return (
            <SwiperSlide key={t.name} className="!w-[300px] md:!w-[340px] !h-auto">
              <article className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                {/* Foto */}
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${
                      t.image ? "hidden" : ""
                    }`}
                  >
                    <span className="text-6xl font-display font-bold text-primary/40">
                      {getInitials(t.name)}
                    </span>
                  </div>

                  {/* Firmen-Badge */}
                  <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-sm">
                    {t.company}
                  </div>
                </div>

                {/* Inhalt */}
                <div className="p-6 flex-1 flex flex-col">
                  <blockquote className="text-foreground font-medium leading-relaxed mb-4 line-clamp-3 min-h-[4.5rem]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mb-6 pb-6 border-b border-border/50 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      {t.linkedin ? (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display font-bold text-foreground hover:text-primary transition-colors"
                        >
                          {t.name}
                        </a>
                      ) : (
                        <p className="font-display font-bold text-foreground">{t.name}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn-Profil von ${t.name}`}
                        title="LinkedIn-Profil"
                        className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-card text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 flex items-center justify-center transition-colors"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Kennzahl */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm text-muted-foreground">{t.metric.label}</span>
                      {isDown ? (
                        <TrendingDown className="w-4 h-4 text-success flex-shrink-0" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-baseline gap-2 flex-wrap">
                      <MetricValue metric={t.metric} />
                      <span className="text-sm text-muted-foreground">{t.metric.description}</span>
                    </div>

                    {/* Mini-Balken */}
                    <div className="flex items-end gap-1 h-8 mt-4" aria-hidden="true">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const height = isDown
                          ? Math.max(20, 100 - i * 12)
                          : Math.min(100, 25 + i * 10);
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-t transition-all duration-500 ${
                              isDown ? "bg-success/40" : "bg-primary/40"
                            }`}
                            style={{ height: `${height}%`, transitionDelay: `${i * 50}ms` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Ergebnisse */}
                  <ul className="mt-4 space-y-2">
                    {t.results.map((result) => (
                      <li key={result} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowUpRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Punkte nur auf Mobile und Tablet */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {testimonials.map((t, index) => (
          <button
            key={t.name}
            type="button"
            onClick={() => swiper?.slideTo(index)}
            aria-label={`Kundenstimme ${index + 1} anzeigen`}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 h-2 bg-foreground" : "w-2 h-2 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
