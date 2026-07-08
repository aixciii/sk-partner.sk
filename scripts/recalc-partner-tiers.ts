// scripts/recalc-partner-tiers.ts
//
// Prepočíta partnerTier a quarterlyVolumeEur pre všetkých schválených B2B užívateľov
// na základe objemu nákupov (súčet OrderItem.totalNet) za PREDCHÁDZAJÚCI ukončený
// kalendárny kvartál (napr. tier na Q3 sa počíta podľa skutočného objemu v Q2).
//
// Statusy objednávok vylúčené z objemu (stornované/vrátené): CANCELLED
// (overené voči enum OrderStatus v schema.prisma — iný stav vrátenia neexistuje).
//
// Spustenie (dry-run, nič nezapisuje do DB, len vypíše):
//   npx tsx scripts/recalc-partner-tiers.ts --dry-run
//
// Spustenie ostré (zapisuje do DB):
//   npx tsx scripts/recalc-partner-tiers.ts
//
// Cron (raz za kvartál, 1. deň prvého mesiaca kvartálu o 03:00):
//   0 3 1 1,4,7,10 * cd /var/www/sk-partner && npx tsx scripts/recalc-partner-tiers.ts >> /var/log/sk-partner-tiers.log 2>&1

import { PrismaClient } from '@prisma/client';
import { resolvePartnerTier } from '../src/lib/pricing';

const prisma = new PrismaClient();

const EXCLUDED_STATUSES = ['CANCELLED'];

const DRY_RUN = process.argv.includes('--dry-run');

function getPreviousQuarterRange(now: Date = new Date()): { start: Date; end: Date; label: string } {
  const year = now.getUTCFullYear();
  const currentQuarter = Math.floor(now.getUTCMonth() / 3); // 0-3 pre Q1-Q4
  let prevQuarter = currentQuarter - 1;
  let prevYear = year;
  if (prevQuarter < 0) {
    prevQuarter = 3;
    prevYear -= 1;
  }
  const start = new Date(Date.UTC(prevYear, prevQuarter * 3, 1));
  const end = new Date(Date.UTC(prevYear, prevQuarter * 3 + 3, 1));
  const label = `Q${prevQuarter + 1} ${prevYear}`;
  return { start, end, label };
}

async function main() {
  const { start, end, label } = getPreviousQuarterRange();

  const users = await prisma.user.findMany({
    where: { approved: true },
    include: {
      orders: {
        where: {
          createdAt: { gte: start, lt: end },
          status: { notIn: EXCLUDED_STATUSES as any },
        },
        include: { items: true },
      },
    },
  });

  console.log(`Prepočet partnerTier pre ${users.length} schválených B2B užívateľov (kvartál ${label}: ${start.toISOString().slice(0, 10)} – ${end.toISOString().slice(0, 10)})`);
  console.log(DRY_RUN ? '--- DRY RUN: žiadne zápisy do DB ---\n' : '--- BOJOVÝ BEH: zapisujem do DB ---\n');

  let changed = 0;
  const tierCounts: Record<string, number> = { BASIC: 0, PREMIUM: 0, GOLD: 0 };

  for (const user of users) {
    const volumeEur = user.orders
      .flatMap((o) => o.items)
      .reduce((sum, item) => sum + item.totalNet, 0);

    const newTier = resolvePartnerTier(volumeEur);
    const oldTier = user.partnerTier;
    tierCounts[newTier]++;

    const line = `${user.email.padEnd(35)} objem=${volumeEur.toFixed(2).padStart(10)}€  ${oldTier} → ${newTier}${oldTier !== newTier ? '  ⚡ ZMENA' : ''}`;
    console.log(line);

    if (oldTier !== newTier) changed++;

    if (!DRY_RUN) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          partnerTier: newTier,
          quarterlyVolumeEur: volumeEur,
          tierUpdatedAt: new Date(),
        },
      });
    }
  }

  console.log(`\nHotovo. Zmenených úrovní: ${changed}/${users.length}.`);
  console.log(`Rozdelenie za ${label}: BASIC=${tierCounts.BASIC}, PREMIUM=${tierCounts.PREMIUM}, GOLD=${tierCounts.GOLD}`);
  if (DRY_RUN) console.log('Toto bol dry-run — spusti bez --dry-run pre zápis do DB.');
}

main()
  .catch((e) => {
    console.error('Chyba pri prepočte:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
