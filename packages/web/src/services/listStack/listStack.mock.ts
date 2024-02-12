import {
  Cursor,
  CursorKind,
  Note,
  SortKind,
  SortOrder,
} from '@stack-note/schema';
import { Service } from '@/types/Service';

export const listStack: Service['ListStack'] = req => {
  const stacks =
    localStorage
      .getItem('__stack')
      ?.split(':')
      .map(stackItem => {
        const [id, createdAt] = stackItem.split(',');
        return { id, createdAt: BigInt(createdAt) };
      }) ?? [];

  const cursor = req.cursor ?? {
    kind: CursorKind.CURSOR_AFTER,
    lastId: '',
    limit: 100,
    timestamp: BigInt(0),
  };

  const sort = req.sort ?? {
    kind: SortKind.SORT_CREATED_AT,
    order: SortOrder.SORT_ORDER_ASCENDING,
  };

  let result = stacks
    .filter(item => {
      const itemTimestamp = item.createdAt;
      if (itemTimestamp > cursor.timestamp) {
        return true;
      }

      if (itemTimestamp === cursor.timestamp && item.id > cursor.lastId) {
        return true;
      }

      return false;
    })
    .sort((itemA, itemB) => {
      if (sort.kind === SortKind.SORT_CREATED_AT) {
        return Number(itemA.createdAt - itemB.createdAt);
      }

      return 0;
    });

  if (sort.order === SortOrder.SORT_ORDER_DESCENDING) {
    result = result.reverse();
  }

  const limit = cursor.limit ?? 100;
  const notes = result.slice(0, limit).map(({ id }) => {
    const { content, ...notePreview } = JSON.parse(
      localStorage.getItem(id)!
    ) as Note;

    return { ...notePreview, excerpt: content.slice(0, 512) };
  });

  const prevCursor: Cursor | undefined =
    result.length > 0
      ? {
          kind: cursor.kind,
          lastId: result[0].id,
          timestamp: result[0].createdAt,
          limit,
        }
      : undefined;

  const nextCursor: Cursor | undefined =
    result.length >= limit
      ? {
          kind: cursor.kind,
          lastId: result[limit - 1].id,
          timestamp: result[limit - 1].createdAt,
          limit,
        }
      : undefined;

  return {
    ok: true,
    result: notes,
    prevCursor,
    nextCursor,
  };
};
