import { style } from '@vanilla-extract/css';
import { theme } from './theme.css';

const typographyBase = style({
  letterSpacing: '-0.01em',
});

const typographyNumberBase = style({
  fontFeatureSettings: '"cv01" on, "ss06" on',
  fontVariantNumeric: 'lining-nums tabular-nums',
  letterSpacing: '-0.04em',
});

const typographyUIBase = style({
  fontFamily: theme.font.ui,
});

const typographyContentBase = style({
  fontFamily: theme.font.content,
});

export const typography = {
  base: typographyBase,
  numberBase: typographyNumberBase,
  uiBase: typographyUIBase,
  contentBase: typographyContentBase,

  /* Presets */
  /** 24 / 28 / 600 */
  header1: style([
    typographyUIBase,
    {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '28px',
    },
  ]),

  /** 14 / 28 / 400 */
  title1: style([
    typographyContentBase,
    {
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '20px',
    },
  ]),

  content1: style([
    typographyContentBase,
    {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '18px',
    },
  ]),
};
