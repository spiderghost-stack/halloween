import Link from "next/link";
import { Flame, Ghost, Skull, Wand2, Moon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const moods = [
  {
    id: "dark-gothic",
    label: "Dark & Gothic",
    description: "For those who dwell in shadows",
    Icon: Skull,
    href: "/shop?mood=dark-gothic",
    color: "from-castle-black to-ancient-wood/60",
    accent: "border-parchment-brown/40",
  },
  {
    id: "classic-halloween",
    label: "Classic Halloween",
    description: "Timeless tricks and treats",
    Icon: Flame,
    href: "/shop?mood=classic-halloween",
    color: "from-castle-black to-dark-red/30",
    accent: "border-halloween-orange/30",
  },
  {
    id: "cute-spooky",
    label: "Cute & Spooky",
    description: "Playfully haunted delights",
    Icon: Ghost,
    href: "/shop?mood=cute-spooky",
    color: "from-castle-black to-ancient-wood/40",
    accent: "border-ivory/20",
  },
  {
    id: "magical-night",
    label: "Magical Night",
    description: "Ancient sorcery and wonder",
    Icon: Wand2,
    href: "/shop?mood=magical-night",
    color: "from-castle-black to-parchment-brown/20",
    accent: "border-magic-gold/30",
  },
  {
    id: "horror-night",
    label: "Horror Night",
    description: "Face your darkest fears",
    Icon: Moon,
    href: "/shop?mood=horror-night",
    color: "from-castle-black to-dark-red/40",
    accent: "border-dark-red/40",
  },
];

export function ShopByMood() {
  return (
    <section className="py-16 md:py-20 bg-castle-black border-y border-magic-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Choose Your Night"
          subtitle="What kind of Halloween will you summon?"
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {moods.map((mood) => {
            const Icon = mood.Icon;
            return (
              <Link
                key={mood.id}
                href={mood.href}
                className={`group relative flex flex-col items-center text-center p-5 md:p-6 rounded-sm border ${mood.accent} bg-gradient-to-b ${mood.color} hover:border-magic-gold/50 transition-all duration-250 hover:shadow-gold`}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4 rounded-sm border border-magic-gold/20 bg-castle-black/60 group-hover:border-magic-gold/50 transition-colors duration-200">
                  <Icon
                    size={22}
                    className="text-magic-gold group-hover:text-bright-gold transition-colors duration-200"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-cinzel text-xs text-ivory uppercase tracking-wider mb-2 leading-tight">
                  {mood.label}
                </p>
                <p className="font-inter text-[10px] text-parchment-brown/70 leading-snug hidden sm:block">
                  {mood.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
