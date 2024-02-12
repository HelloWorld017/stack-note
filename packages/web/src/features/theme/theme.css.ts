import { createTheme } from '@vanilla-extract/css';

export const baseVars = {
  color: {
    /* beige */
    beige400: '#aba18c',
    beige900: '#fbf9f4',

    darkAlpha050: 'rgba(0, 0, 0, .05)',
    darkAlpha200: 'rgba(0, 0, 0, .2)',
    darkAlpha300: 'rgba(0, 0, 0, .3)',
    darkAlpha500: 'rgba(0, 0, 0, .5)',

    black: '#000000',
    grey300: '#444444',
    white: '#ffffff',
  },
  shadow: {
    regular: '0 2px 20px 0 rgba(0, 0, 0, .18)',
  },
  radius: {
    extraSmall: '6px',
    small: '10px',
    regular: '16px',
    full: '999px',
  },
  opacity: {
    hover: '0.7',
  },
  easing: {
    background: 'cubic-bezier(0.55, 0.15, 0.25, 0.95) .4s',
    fill: 'cubic-bezier(0.60, 0.05, 0.60, 1.00) .4s',
  },
  font: {
    ui: '"Metropolis", "Pretendard JP Variable", sans-serif',
    content: '"Pretendard JP Variable", sans-serif',
  },
};

type Surface = {
  bgBase: string;
  bgElevated?: string;
  fillLine?: string;
  fillPrimary: string;
  fillSecondary?: string;
  fillTertiary?: string;
  fillHighlight?: string;
};

const [defaultThemeClass, themeVars] = createTheme({
  color: {
    primary: {
      bgBase: baseVars.color.beige900,
      fillPrimary: baseVars.color.black,
      fillSecondary: baseVars.color.darkAlpha500,
      fillTertiary: baseVars.color.darkAlpha300,
      fillHighlight: baseVars.color.beige400,
      fillLine: baseVars.color.darkAlpha050,
    } satisfies Surface,
    actionBase: {
      bgBase: baseVars.color.grey300,
      fillPrimary: baseVars.color.white,
    } satisfies Surface,
    actionHighlight: {
      bgBase: baseVars.color.beige400,
      fillPrimary: baseVars.color.white,
    } satisfies Surface,
  },
});

const theme = {
  ...baseVars,
  ...themeVars,
  color: {
    ...baseVars.color,
    ...themeVars.color,
  },
};

export { defaultThemeClass, theme };
