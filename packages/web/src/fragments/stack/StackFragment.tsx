import * as styles from './StackFragment.css';
import { Header } from './_components/Header';
import { NoteWrite } from './_components/NoteWrite';
import { StackProvider } from './_components/StackProvider';

export const StackFragment = () => {
  return (
    <StackProvider>
      <div class={styles.containerStyle}>
        <Header />
        <NoteWrite />
      </div>
    </StackProvider>
  );
};
