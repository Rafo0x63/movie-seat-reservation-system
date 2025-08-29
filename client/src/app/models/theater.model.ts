import { Schedule } from "./schedule.model";

export interface Theater {
  id: number;
  name: string;
  address: string;
  slug: string;
  schedules: Schedule[];
}
