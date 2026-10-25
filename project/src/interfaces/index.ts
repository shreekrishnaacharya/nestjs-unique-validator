// decorator options interface
export type IsUniqeInterface = {
  table: string;
  column?: string;
  conditions?: Record<string, any>[];
  updateId?: string;
  objectId?: string;
};
