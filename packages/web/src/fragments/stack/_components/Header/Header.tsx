import { Show } from 'solid-js';
import IconArchive from '../../_assets/IconArchive.svg';
import IconBin from '../../_assets/IconBin.svg';
import { useStackController } from '../StackProvider';
import * as styles from './Header.css';

export const Header = () => {
  const stack = useStackController();
  const isStackLarge = () => stack.count() > 100;

  return (
    <header class={styles.containerStyle}>
      <h1 class={styles.titleStyle}>
        <Show when={!isStackLarge()} fallback={<span class={styles.frownStyle}>:(</span>}>
          <span class={styles.countStyle}>{stack.count()}</span>
        </Show>
        {' Stacks'}
      </h1>
      <div style={styles.buttonsStyle}>
        <Show when={isStackLarge()}>
          <button class={styles.buttonStyle.primary}>
            <IconBin />
          </button>
        </Show>
        <button class={styles.buttonStyle.secondary}>
          <IconArchive />
        </button>
      </div>
    </header>
  );
};
