import { deleteNote } from './deleteNote/deleteNote.mock';
import { listStack } from './listStack/listStack.mock';
import type { Service as ServiceType } from '@/types/Service';

const MockService: ServiceType = {
  DeleteNote: deleteNote,
  ListStack: listStack,
};

export const Service = window.bridge ?? MockService;
