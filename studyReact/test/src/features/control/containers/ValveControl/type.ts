export interface ScheduleItem {
    dateTime: string; // HH:mm
    action: 'ON' | 'OFF';
}

export interface ValveConfigSchedule {
    startDate: string;
    endDate?: string | null;
    isRepeat?: boolean;
    cycle?: string[];
    schedules: ScheduleItem[];
    cycleDays?: string[];
}

export interface ValveDevice {
    mode?: string[];
    configSchedule: ValveConfigSchedule;
}
