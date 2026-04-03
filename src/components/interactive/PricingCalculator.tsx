import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { plans } from "../../data/pricing";

export default function PricingCalculator() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div>
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span
          className={`text-sm font-medium transition-colors ${
            !isYearly
              ? "text-[hsl(var(--foreground))]"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          Monatlich
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 ${
            isYearly
              ? "bg-[hsl(var(--primary))]"
              : "bg-[hsl(var(--muted-foreground)/0.3)]"
          }`}
          aria-label="Abrechnungszeitraum wechseln"
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              isYearly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            isYearly
              ? "text-[hsl(var(--foreground))]"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          Jährlich
        </span>
        {isYearly && (
          <span className="text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 rounded-full">
            Spare bis zu 26%
          </span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const savings = isYearly
            ? Math.round(
                ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) *
                  100
              )
            : 0;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border-2 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-[hsl(var(--primary))] shadow-lg hover:shadow-2xl"
                  : "border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground)/0.3)] hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Beliebteste Option
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                  {plan.description}
                </p>
                <div className="pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">&euro;{price}</span>
                    <span className="text-[hsl(var(--muted-foreground))]">
                      /User/Mo.
                    </span>
                  </div>
                  {isYearly && savings > 0 && (
                    <p className="text-xs text-[hsl(var(--primary))] font-medium mt-1">
                      {savings}% günstiger als monatlich
                    </p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="p-6 pt-0 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div
                        className={`flex-shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? "bg-[hsl(var(--primary)/0.15)]"
                            : "bg-[hsl(var(--muted))]"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${
                            plan.popular
                              ? "text-[hsl(var(--primary))]"
                              : "text-[hsl(var(--muted-foreground))]"
                          }`}
                        />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a
                  href="https://app.shortselect.com/signup"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] shadow-md hover:shadow-lg"
                      : "border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--muted-foreground)/0.3)]"
                  }`}
                >
                  Jetzt starten
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise CTA */}
      <div className="mt-10 max-w-6xl mx-auto">
        <div className="rounded-xl border-2 border-dashed border-[hsl(var(--muted-foreground)/0.2)] bg-[hsl(var(--card))]">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-4">
            <div>
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
                Individuelle Lösung? SSO/SAML, SLA, dedizierter Account
                Manager, Custom Integrations &mdash; alles individuell.
              </p>
            </div>
            <a
              href="mailto:hello@shortselect.com"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-[hsl(var(--border))] font-semibold hover:bg-[hsl(var(--muted))] transition-colors"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-8">
        Alle Preise zzgl. MwSt. &bull; 14 Tage kostenlos testen &bull; Keine
        Kreditkarte erforderlich &bull; Jederzeit kündbar
      </p>
    </div>
  );
}
