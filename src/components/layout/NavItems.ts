import { type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  isVisible: (isProducer: boolean) => boolean;
  exact: boolean;
};

// Importar iconos más relevantes para agricultura
import { 
  Home, 
  User, 
  Star, 
  Store, 
  Package,
  Sprout,
  Wheat,
  Apple
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    label: "Inicio",
    path: "/dashboard",
    icon: Home,
    isVisible: () => true,
    exact: true,
  },
  {
    label: "Mi perfil",
    path: "/dashboard/profile",
    icon: User,
    isVisible: () => true,
    exact: false,
  },
  {
    label: "Mis reseñas",
    path: "/dashboard/reviews",
    icon: Star,
    isVisible: (isProducer) => !isProducer || isProducer,
    exact: false,
  },
  {
    label: "Emprendimientos",
    path: "/dashboard/ventures",
    icon: Sprout, // Cambio de Store a Sprout (más agrícola)
    isVisible: (isProducer) => isProducer,
    exact: false,
  },
  {
    label: "Mis productos",
    path: "/dashboard/products",
    icon: Apple, // Cambio de Box a Apple (más orgánico)
    isVisible: (isProducer) => isProducer && false,
    exact: false,
  },
];