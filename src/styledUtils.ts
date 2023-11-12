import { DefaultTheme, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    

    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
        margin: 0;
        font-family: 'Inter', sans-serif;
        overflow:hidden;
    }

    input[type="text"]{
        border-radius: .75em;
    }

    input[type="text"]::placeholder{
        color: ${({ theme }) => theme.colors.neutrals[400]}
    }

    .extra-info{
   
    }

    /* width */
  
   @media (max-width:${({ theme }) => theme.screenSizes.tablet}) {
      .extra-info{
        display:none;
      }
      html{
      font-size:13px;
      }
   }
  `;

export interface StyledProps {
  theme: ThemeObj;
}

export interface ThemeObj {
  colors: {
    primaries: ColorPalette;
    neutrals: ColorPalette;
    accents: {
      red: ColorPalette;
      yellow: ColorPalette;
      blue: ColorPalette;
    };
  };
  screenSizes: {
    mobile: string;
    tablet: string;
    laptop: string;
    desktops: string;
    extraLarge: string;
  };
  sizes: {
    navHeight: string;
  };
  animations: {
    transition: string;
  };
}

export type ColorPalette = {
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
const theme: ThemeObj = {
  colors: {
    primaries: {
      100: "#C3F5E9",
      200: "#85E0B2",
      300: "#79C0A2",
      400: "#4CA47F",
      500: "#438A60",
      600: "#356D3E",
      700: "#215F2B",
      800: "#1D5225",
      900: "#213A15",
    },
    neutrals: {
      100: "#F2F2F2",
      200: "#C9CFCC",
      300: "#AEB7B2",
      400: "#949E99",
      500: "#798680",
      600: "#616B66",
      700: "#48514D",
      800: "#303633",
      900: "#061314",
    },
    accents: {
      red: {
        100: "#FFA3A3",
        300: "#FC7D7D",
        500: "#F55757",
        700: "#E61B1B",
        900: "#A51C1C",
      },
      yellow: {
        100: "#FFE8A3",
        300: "#FFDC75",
        500: "#F5C73D",
        700: "#D9AA1B",
        900: "#9D7C18",
      },
      blue: {
        100: "#BAD2F6",
        300: "#92B9F1",
        500: "#65A4FD",
        700: "#4A87DD",
        900: "#1159BF",
      },
    },
  },
  screenSizes: {
    mobile: "320px",
    tablet: "480px",
    laptop: "768px",
    desktops: "1025px",
    extraLarge: "1200px",
  },
  sizes: {
    navHeight: "50px",
  },
  animations: {
    transition: "all 0.1s ease-in-out",
  },
};

export { theme, GlobalStyle };
