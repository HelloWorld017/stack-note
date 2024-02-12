import { SortKind, SortOrder } from '@stack-note/schema';
import { createInfiniteQuery } from '@tanstack/solid-query';
import { Set as ImmutableSet } from 'immutable';
import { createContext, createMemo, createSignal, untrack, useContext } from 'solid-js';
import { useService } from '@/features/service';
import type { Cursor, NotePreview } from '@stack-note/schema';
import type { Accessor, JSX } from 'solid-js';

type StackContextType = {
  stack: Accessor<NotePreview[]>;
  count: Accessor<number>;
  archiveNote: (noteId: string) => void;
};

const StackContext = createContext<StackContextType>();

export const StackProvider = (props: { children: JSX.Element }) => {
  const service = useService();

  const query = createInfiniteQuery(() => ({
    queryKey: ['ListStack'],
    queryFn: ({ pageParam }) =>
      service.ListStack({
        cursor: pageParam,
        sort: {
          kind: SortKind.SORT_CREATED_AT,
          order: SortOrder.SORT_ORDER_DESCENDING,
        },
      }),
    initialPageParam: undefined as Cursor | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor,
    getPreviousPageParam: firstPage => firstPage.prevCursor,
  }));

  const [hiddenNoteIds, setHiddenNoteIds] = createSignal(ImmutableSet<string>());
  const notes = createMemo(
    () =>
      query.data?.pages
        .flatMap(page => page.result)
        .filter(note => note.metadata && !hiddenNoteIds().has(note.metadata.id)) ?? []
  );

  const archiveNote = async (noteId: string) => {
    const prevHiddenNoteIds = untrack(hiddenNoteIds);
    setHiddenNoteIds(prevHiddenNoteIds.add(noteId));

    const { ok } = await service.ArchiveNote({ id: noteId });
    if (!ok) {
      setHiddenNoteIds(prevHiddenNoteIds);
    }
  };

  const stackController = {
    stack: notes,
    count: () => Number(query.data?.pages.at(-1)?.count ?? 0),
    archiveNote,
  };

  return <StackContext.Provider value={stackController}>{props.children}</StackContext.Provider>;
};

export const useStackController = () => {
  const stackController = useContext(StackContext)!;
  return stackController;
};
