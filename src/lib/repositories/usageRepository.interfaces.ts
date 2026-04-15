import { USAGE_BLOCK_STORAGE_KEY } from "@/lib/usage";
import type { UsageBlock, UsageBlockDraft } from "@/lib/usage";

export type UsageStorageShape = {
  [USAGE_BLOCK_STORAGE_KEY]?: UsageBlock[] | null;
};

export interface UsageRepository {
  insertOne(block: UsageBlockDraft): Promise<UsageBlock>;
  updateOneById(id: string, block: UsageBlockDraft): Promise<UsageBlock | null>;
  findAll(): Promise<UsageBlock[]>;
  deleteOneById(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
