interface StyledProps {
  theme: ThemeObj;
}

interface ThemeObj {
  colors: {
    primaries: ColorPalette;
    neutrals: ColorPalette;
    accents: {
      red: ColorPalette;
      yellow: ColorPalette;
      blue: ColorPalette;
    };
  };
  sizes: {
    navHeight: string;
  };
  animations: {
    transition: string;
  };
}

type ColorPalette = {
  100: string;
  200?: string;
  300: string;
  400?: string;
  500: string;
  600?: string;
  700: string;
  800?: string;
  900: string;
};
