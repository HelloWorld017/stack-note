import { style, styleVariants } from '@vanilla-extract/css';
import { theme, typography } from '@/features/theme';

const containerBaseStyle = style({
  position: 'relative',
  border: `1px solid ${theme.color.primary.fillTertiary}`,
  borderRadius: theme.radius.regular,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 100,
  padding: '16px 18px',
  transition: `all ${theme.easing.fill}`,
  selectors: {
    '&::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      borderRadius: theme.radius.regular,
      outline: `1px dashed ${theme.color.primary.fillTertiary}`,
      opacity: 0,
      pointerEvents: 'none',
      transition: `opacity ${theme.easing.fill}`,
    },
  },
});

export const containerStyle = styleVariants({
  inactive: [
    containerBaseStyle,
    {
      borderColor: 'transparent',
      selectors: {
        '&::after': { opacity: 1 },
        '&:focus-within': { borderColor: theme.color.primary.fillTertiary },
        '&:focus-within::after': { opacity: 0 },
      },
    },
  ],
  active: [containerBaseStyle, { borderColor: theme.color.primary.fillSecondary }],
  elevated: [containerBaseStyle, { minHeight: 200 }],
});

export const inputStyle = style([
  typography.title1,
  {
    flex: '0 0 auto',
    marginBottom: '4px',
  },
]);

export const textAreaStyle = style([
  typography.content1,
  {
    width: '100%',
    resize: 'none',
    flex: '1 1 0',
    whiteSpace: 'pre-wrap',
    selectors: {
      '&::placeholder': {
        color: theme.color.primary.fillSecondary,
      },
    },
  },
]);

export const submitContainerStyle = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const submitStyle = style([
  typography.content1,
  typography.uiBase,
  {
    background: theme.color.actionBase.bgBase,
    color: theme.color.actionBase.fillPrimary,
    padding: '8px 12px',
    borderRadius: theme.radius.small,
    minHeight: 0,
  },
]);
