import { style } from '@vanilla-extract/css';
import { theme } from '@/features/theme';

export const appStyle = style({
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0,
  overflow: 'hidden',
  background: theme.color.primary.bgBase,
});
