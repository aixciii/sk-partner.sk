import { PartnerTier } from '@prisma/client';

// Prahy objemu nákupov za jeden kalendárny kvartál (EUR bez DPH), ktoré určujú partnerTier.
const PREMIUM_THRESHOLD_EUR = 10_000;
const GOLD_THRESHOLD_EUR = 50_000;

export function resolvePartnerTier(volumeEur: number): PartnerTier {
  if (volumeEur >= GOLD_THRESHOLD_EUR) return PartnerTier.GOLD;
  if (volumeEur >= PREMIUM_THRESHOLD_EUR) return PartnerTier.PREMIUM;
  return PartnerTier.BASIC;
}
