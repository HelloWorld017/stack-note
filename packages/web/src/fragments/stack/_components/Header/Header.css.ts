import { style, styleVariants } from '@vanilla-extract/css';

import { theme, typography } from '@/features/theme';

export const containerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const titleStyle = style([
  typography.header1,
  typography.uiBase,
  {
    color: theme.color.primary.fillPrimary,
  },
]);

export const countStyle = style([
  typography.numberBase,
  {
    color: theme.color.primary.fillHighlight,
  },
]);

export const frownStyle = style([
  {
    display: 'inline-block',
    color: theme.color.primary.fillHighlight,
    transform: 'rotate(90deg)',
    transformOrigin: 'center',
  },
]);

export const buttonsStyle = style({
  display: 'flex',
  gap: '8px',
});

const buttonBaseStyle = style({
  padding: '12px',
  fontSize: '16px',
  borderRadius: theme.radius.regular,
  boxShadow: theme.shadow.regular,
});

export const buttonStyle = styleVariants({
  primary: [
    buttonBaseStyle,
    {
      background: theme.color.actionHighlight.bgBase,
      color: theme.color.actionHighlight.fillPrimary,
    },
  ],
  secondary: [
    buttonBaseStyle,
    {
      background: theme.color.actionBase.bgBase,
      color: theme.color.actionBase.fillPrimary,
    },
  ],
});
