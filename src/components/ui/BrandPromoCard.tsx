import React from 'react';

interface BrandPromoCardProps {
  title: string;
  description: string;
  ctaLabel: string;
}

export function BrandPromoCard({ title, description, ctaLabel }: BrandPromoCardProps) {
  return (
    <section className="max-w-xl rounded-3xl bg-primary p-10 text-primary-foreground shadow-lg shadow-primary/20">
      <div className="flex flex-col gap-6">
        <span className="inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
          New season
        </span>

        <div className="space-y-3">
          <h2 className="font-brand text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-prose text-base text-primary-100">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition hover:bg-accent-600">
            {ctaLabel}
          </button>
          <span className="rounded-full border border-white/20 px-5 py-2 text-sm text-primary-100">
            Free shipping over $75
          </span>
        </div>
      </div>
    </section>
  );
}
