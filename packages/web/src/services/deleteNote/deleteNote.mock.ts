import { Service } from '@/types/Service';

export const deleteNote: Service['DeleteNote'] = req => {
  localStorage.removeItem(req.id);
  return { ok: true };
};
