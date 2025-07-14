// src/lib/theme.ts
import { extendTheme } from "@chakra-ui/react";

// Paleta de colores según la guía de estilo
const colors = {
  organic: {
    // Verde principal (#4CAF50) - sostenibilidad y lo orgánico
    green: {
      50: "#e8f8e8",
      100: "#c3ecc3", 
      200: "#9cdf9c",
      300: "#74d174",
      400: "#57c857",
      500: "#4CAF50", // Color principal de la guía
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
    },
    // Tonos tierra (#8B4513) - agricultura y naturaleza
    earth: {
      50: "#f7f3f0",
      100: "#ede0d6",
      200: "#dbc5b0",
      300: "#c8a889",
      400: "#b59066",
      500: "#8B4513", // Color principal de la guía
      600: "#7d3e11",
      700: "#6b350f",
      800: "#592c0c",
      900: "#472309",
    },
    // Acentos vivos (#FF6347) - resaltar frutas y vegetales
    accent: {
      50: "#fff5f3",
      100: "#ffe3de",
      200: "#ffc5bb",
      300: "#ffa192",
      400: "#ff7d69",
      500: "#FF6347", // Color principal de la guía
      600: "#ff4820",
      700: "#e63a19",
      800: "#cc2f15",
      900: "#a62411",
    },
  },
  // Redefinir colores primarios de Chakra para usar nuestra paleta
  green: {
    50: "#e8f8e8",
    100: "#c3ecc3", 
    200: "#9cdf9c",
    300: "#74d174",
    400: "#57c857",
    500: "#4CAF50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  orange: {
    50: "#fff5f3",
    100: "#ffe3de",
    200: "#ffc5bb",
    300: "#ffa192",
    400: "#ff7d69",
    500: "#FF6347",
    600: "#ff4820",
    700: "#e63a19",
    800: "#cc2f15",
    900: "#a62411",
  },
  brown: {
    50: "#f7f3f0",
    100: "#ede0d6",
    200: "#dbc5b0",
    300: "#c8a889",
    400: "#b59066",
    500: "#8B4513",
    600: "#7d3e11",
    700: "#6b350f",
    800: "#592c0c",
    900: "#472309",
  },
};

// Tipografía moderna sans-serif
const fonts = {
  heading: `"Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif`,
  body: `"Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif`,
};

// Configuración de componentes
const components = {
  Button: {
    baseStyle: {
      fontWeight: "semibold",
      borderRadius: "lg",
    },
    variants: {
      solid: {
        bg: "green.500",
        color: "white",
        _hover: {
          bg: "green.600",
          transform: "translateY(-1px)",
          boxShadow: "lg",
        },
        _active: {
          bg: "green.700",
          transform: "translateY(0)",
        },
      },
      outline: {
        borderColor: "green.500",
        color: "green.500",
        _hover: {
          bg: "green.50",
          borderColor: "green.600",
        },
      },
      ghost: {
        color: "green.500",
        _hover: {
          bg: "green.50",
        },
      },
      // Variante especial para productos orgánicos
      organic: {
        bg: "organic.green.500",
        color: "white",
        _hover: {
          bg: "organic.green.600",
          transform: "translateY(-2px)",
          boxShadow: "xl",
        },
      },
      // Variante para acentos
      accent: {
        bg: "organic.accent.500",
        color: "white",
        _hover: {
          bg: "organic.accent.600",
          transform: "translateY(-2px)",
          boxShadow: "xl",
        },
      },
      // Variante tierra
      earth: {
        bg: "organic.earth.500",
        color: "white",
        _hover: {
          bg: "organic.earth.600",
          transform: "translateY(-2px)",
          boxShadow: "xl",
        },
      },
    },
    defaultProps: {
      colorScheme: "green",
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: "xl",
        boxShadow: "md",
        _hover: {
          boxShadow: "xl",
          transform: "translateY(-2px)",
          transition: "all 0.2s",
        },
      },
    },
    variants: {
      organic: {
        container: {
          borderTop: "4px solid",
          borderTopColor: "green.500",
          bg: "white",
        },
      },
      earth: {
        container: {
          borderTop: "4px solid", 
          borderTopColor: "brown.500",
          bg: "white",
        },
      },
      accent: {
        container: {
          borderTop: "4px solid",
          borderTopColor: "orange.500", 
          bg: "white",
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "bold",
      letterSpacing: "-0.02em",
    },
    variants: {
      organic: {
        color: "green.600",
      },
      earth: {
        color: "brown.600", 
      },
      accent: {
        color: "orange.600",
      },
    },
  },
  Badge: {
    variants: {
      organic: {
        bg: "green.100",
        color: "green.800",
      },
      earth: {
        bg: "brown.100",
        color: "brown.800",
      },
      accent: {
        bg: "orange.100", 
        color: "orange.800",
      },
    },
  },
};

// Configuración global de estilos
const styles = {
  global: {
    body: {
      bg: "gray.50",
      color: "gray.800",
    },
    "*::placeholder": {
      color: "gray.400",
    },
    "*, *::before, &::after": {
      borderColor: "gray.200",
    },
  },
};

// Tema personalizado
const organicTheme = extendTheme({
  colors,
  fonts,
  components,
  styles,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  // Espaciado personalizado para diseño más amplio
  space: {
    18: "4.5rem",
    88: "22rem",
  },
  // Breakpoints personalizados
  breakpoints: {
    sm: "30em",
    md: "48em", 
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
});

export default organicTheme;