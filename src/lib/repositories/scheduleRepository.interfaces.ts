import { SCHEDULE_BLOCK_STORAGE_KEY } from "@/lib/schedules";
import type { ScheduleBlock, ScheduleBlockDraft } from "@/lib/schedules";

export type ScheduleStorageShape = {
  [SCHEDULE_BLOCK_STORAGE_KEY]?: ScheduleBlock[] | null;
};

export interface ScheduleRepository {
  insertOne(schedule: ScheduleBlockDraft): Promise<ScheduleBlock>;
  updateOneById(id: string, schedule: ScheduleBlockDraft): Promise<ScheduleBlock | null>;
  findAll(): Promise<ScheduleBlock[]>;
  deleteOneById(id: string): Promise<void>;
}
