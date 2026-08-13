"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden sm:min-h-[92vh]">
      {/* Zdjęcie w tle — podmień /public/hero.jpg na własne (poziome, min. 1920px szer.) */}
      <Image
        src="/hero.jpg"
        alt="Fotograf trzymający aparat bezlusterkowy"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_13%]"
      />
      {/* Półprzezroczysta nakładka dla czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-t from-fg/85 via-fg/55 to-fg/25" />

      <div className="relative max-w-wrap mx-auto w-full px-6 py-20 sm:py-32 md:px-10 md:py-48">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-[18ch] text-[clamp(2.4rem,9vw,6.5rem)] font-medium leading-[0.98] tracking-tightest text-bg sm:leading-[0.96]"
        >
          Uchwyć każdą chwilę.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[50ch] text-base leading-relaxed text-bg/85 sm:mt-7 sm:text-lg md:text-xl"
        >
          Sprzęt, który znika w tle i zostawia miejsce na Twoje spojrzenie.
          Aparaty i obiektywy dobrane dla twórców, dla których liczy się
          każdy kadr — od pierwszej sesji po zawodowy set.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <Link
            href="/kategoria/mirrorless"
            className="inline-flex items-center justify-center rounded-full bg-bg px-8 py-4 text-sm font-medium text-fg transition-colors hover:bg-accent hover:text-accent-fg"
          >
            Zobacz kolekcję
          </Link>
          <Link
            href="/kategoria/lenses"
            className="inline-flex items-center justify-center rounded-full border border-bg/40 px-8 py-4 text-sm font-medium text-bg transition-colors hover:border-bg hover:bg-bg/10"
          >
            Przeglądaj obiektywy
          </Link>
        </motion.div>
      </div>
    </section>
  );
}