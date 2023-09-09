import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        font-family: 'Inter', sans-serif;
    }

    input[type="text"]{
        border-radius: .75em;
    }

    input[type="text"]::placeholder{
        color: ${({ theme }) => theme.colors.neutrals[400]}
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.primaries[900]};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.primaries[400]};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.primaries[500]};
    }
`;

const theme = {
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
  sizes: {
    navHeight: "50px",
  },
  animations: {
    transition: "all 0.1s ease-in-out",
  },
};

export { theme, GlobalStyle };
