import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@/features/theme';

const scaleTransitionBaseStyle = style({
  display: 'grid',
  transition: `all ${theme.easing.fill}`,
  overflow: 'hidden',
});

export const scaleTransitionStyle = styleVariants({
  inactive: [scaleTransitionBaseStyle, { opacity: 0, gridTemplateRows: '0fr' }],
  active: [scaleTransitionBaseStyle, { opacity: 1, gridTemplateRows: '1fr' }],
});

export const contentStyle = style({
  minHeight: 0,
});
