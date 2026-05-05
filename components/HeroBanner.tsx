"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgFrom: string;
  bgTo: string;
  carImage: string;
  carAlt: string;
  delay?: number;
  priority?: boolean;
}

function BannerCard({ title, subtitle, buttonText, bgFrom, bgTo, carImage, carAlt, delay = 0, priority = false }: BannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative flex-1 rounded-[10px] overflow-hidden h-[280px] flex flex-col justify-between p-8"
      style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.15, ease: "easeOut" }}
        className="max-w-[220px] z-10 relative"
      >
        <h2 className="text-white font-semibold text-2xl leading-snug mb-2">{title}</h2>
        <p className="text-white/80 text-xs leading-relaxed mb-6">{subtitle}</p>
        <Link href="/cars" className="inline-block bg-[#3563E9] hover:bg-[#2a52c9] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-[4px] relative left-1">
          {buttonText}
        </Link>
      </motion.div>

      {/* Car Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: "easeOut" }}
        className="absolute bottom-0 right-4 w-[300px] h-[160px]"
      >
        <Image
          src={carImage}
          alt={carAlt}
          fill
          priority={priority}
          sizes="300px"
          className="object-contain object-right-bottom drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroBanner() {
  return (
    <section className="flex flex-col md:flex-row gap-6">
      <BannerCard
        title="The Best Platform for Car Rental"
        subtitle="Ease of doing a car rental safely and reliably. Of course at a low price."
        buttonText="Rental Car"
        bgFrom="#1C3FA8" bgTo="#3563E9"
        carImage="/koenigsegg.png" carAlt="Koenigsegg"
        delay={0} priority
      />
      <BannerCard
        title="Easy way to rent a car at a low price"
        subtitle="Providing cheap car rental services and safe and comfortable facilities."
        buttonText="Rental Car"
        bgFrom="#1C7EBD" bgTo="#54A6D4"
        carImage="/nissan-gtr.png" carAlt="Nissan GT-R"
        delay={0.1} priority
      />
    </section>
  );
}
