import { splitProps } from 'solid-js';
import { cx } from '@/features/classNames';
import * as styles from './FadeTransition.css';
import type { JSX } from 'solid-js';

export const FadeTransition = (props: JSX.IntrinsicElements['div'] & { active: boolean }) => {
  const [local, passedProps] = splitProps(props, ['active', 'class', 'children']);

  return (
    <div
      class={cx(local.class, styles.scaleTransitionStyle[local.active ? 'active' : 'inactive'])}
      {...passedProps}
    >
      {local.children}
    </div>
  );
};

FadeTransition.Contents = (props: JSX.IntrinsicElements['div']) => {
  const [local, passedProps] = splitProps(props, ['class', 'children']);

  return (
    <div class={cx(local.class, styles.contentStyle)} {...passedProps}>
      {local.children}
    </div>
  );
};
