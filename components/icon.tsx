import {
  Baby,
  Car,
  ChefHat,
  Crown,
  Droplets,
  Eye,
  Flame,
  ShieldCheck,
  Sparkles,
  Sun,
  Tent,
  Trees,
  Umbrella,
  Users,
  Waves,
  Wifi,
  Wind,
  Zap,
  type LucideProps,
} from 'lucide-react'

const map = {
  Baby,
  Car,
  ChefHat,
  Crown,
  Droplets,
  Eye,
  Flame,
  ShieldCheck,
  Sparkles,
  Sun,
  Tent,
  Trees,
  Umbrella,
  Users,
  Waves,
  Wifi,
  Wind,
  Zap,
} as const

export type IconName = keyof typeof map

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles
  return <Cmp {...props} />
}
