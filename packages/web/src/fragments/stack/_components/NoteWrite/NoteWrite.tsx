import { createEffect, createSignal, Show } from 'solid-js';
import { match } from 'ts-pattern';
import { FadeTransition } from '@/fragments/_components/FadeTransition';
import * as styles from './NoteWrite.css';

export const NoteWrite = () => {
  let titleRef: HTMLInputElement;
  let contentRef: HTMLTextAreaElement;

  const [title, setTitle] = createSignal<string | null>(null);
  const [content, setContent] = createSignal('');

  createEffect(() => {
    if (title() !== null) {
      return;
    }

    const match = content().match(/^\s*(\S.+)$/m);
    if (!match || !match.at(0)) {
      return;
    }

    const { index, 0: matchOutput, 1: nextTitle } = match;

    const contentStart = (index ?? 0) + matchOutput.length;
    if (contentStart < content().length) {
      setTitle(nextTitle);
      setContent(content().slice(contentStart + 1));
    }
  });

  createEffect(() => {
    if (title() === null) {
      return;
    }

    if (!title() && !content()) {
      setTitle(null);
      contentRef.focus();
    }
  });

  const isActive = () => content().length > 0;
  const isElevated = () => typeof title() === 'string';

  const onTitleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      contentRef.focus();
    }
  };

  const onContentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' && isElevated() && content().length === 0) {
      e.preventDefault();
      titleRef.focus();
    }
  };

  return (
    <label
      class={match({ isElevated: isElevated(), isActive: isActive() })
        .with({ isElevated: true }, () => styles.containerStyle.elevated)
        .with({ isActive: true }, () => styles.containerStyle.active)
        .otherwise(() => styles.containerStyle.inactive)}
    >
      <Show when={isElevated()}>
        <input
          class={styles.inputStyle}
          ref={titleRef!}
          value={title() ?? ''}
          placeholder="제목 입력하기"
          onKeyDown={onTitleKeyDown}
          onInput={e => setTitle(e.currentTarget.value)}
        />
      </Show>
      <textarea
        class={styles.textAreaStyle}
        ref={contentRef!}
        value={content()}
        onKeyDown={onContentKeyDown}
        onInput={e => setContent(e.currentTarget.value)}
        placeholder={isElevated() ? '노트 내용 입력하기' : '스택에 노트 추가하기'}
      />
      <FadeTransition active={isElevated()}>
        <FadeTransition.Contents class={styles.submitContainerStyle}>
          <Show when={isElevated()}>
            <button class={styles.submitStyle} type="button">
              추가하기
            </button>
          </Show>
        </FadeTransition.Contents>
      </FadeTransition>
    </label>
  );
};
