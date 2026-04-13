import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import { SCHEDULE_BLOCK_STORAGE_KEY, type ScheduleBlock, type ScheduleBlockDraft } from "@/lib/schedules";
import type {
  ScheduleRepository,
  ScheduleStorageShape,
} from "@/lib/repositories/scheduleRepository.interfaces";

export class ChromeStorageScheduleRepository implements ScheduleRepository {
  async findAll(): Promise<ScheduleBlock[]> {
    const values = await getLocalStorageValues<ScheduleStorageShape>([
      SCHEDULE_BLOCK_STORAGE_KEY,
    ]);

    return values[SCHEDULE_BLOCK_STORAGE_KEY] ?? [];
  }

  async insertOne(schedule: ScheduleBlockDraft): Promise<ScheduleBlock> {
    const schedules = await this.findAll();
    const createdSchedule: ScheduleBlock = {
      ...schedule,
      id: crypto.randomUUID(),
    };

    await setLocalStorageValues({
      [SCHEDULE_BLOCK_STORAGE_KEY]: [...schedules, createdSchedule],
    });

    return createdSchedule;
  }

  async updateOneById(
    id: string,
    schedule: ScheduleBlockDraft,
  ): Promise<ScheduleBlock | null> {
    const schedules = await this.findAll();
    let updatedSchedule: ScheduleBlock | null = null;

    const nextSchedules = schedules.map((currentSchedule) => {
      if (currentSchedule.id !== id) {
        return currentSchedule;
      }

      updatedSchedule = { ...schedule, id };
      return updatedSchedule;
    });

    if (!updatedSchedule) {
      return null;
    }

    await setLocalStorageValues({
      [SCHEDULE_BLOCK_STORAGE_KEY]: nextSchedules,
    });

    return updatedSchedule;
  }

  async deleteOneById(id: string): Promise<void> {
    const schedules = await this.findAll();

    await setLocalStorageValues({
      [SCHEDULE_BLOCK_STORAGE_KEY]: schedules.filter(
        (schedule) => schedule.id !== id,
      ),
    });
  }
}

export const scheduleRepository: ScheduleRepository =
  new ChromeStorageScheduleRepository();

export type { ScheduleRepository, ScheduleStorageShape } from "@/lib/repositories/scheduleRepository.interfaces";
