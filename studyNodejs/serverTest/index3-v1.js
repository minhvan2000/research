import { performance } from 'node:perf_hooks';

const arrSchedules = [
    {
        time: '16:30:00',
        action: true,
        dimming: 100,
        isEnabled: true,
        firstDay: '2025-05-05',
        days: [
            '2025-05-05',
            '2025-05-06',
            '2025-05-07',
            '2025-05-08',
            '2025-05-09',
            '2025-05-10',
            '2025-05-11',
        ],
    },
];

const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const formatDate = (date) => date.toISOString().split('T')[0];

const getCurrentMonday = () => {
    const now = new Date();
    const diff = (now.getDay() + 6) % 7; // Monday = 0
    now.setDate(now.getDate() - diff);
    return formatDate(now);
};

const getNextMonday = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return formatDate(date);
};

const createScheduleForDays = (days, baseSchedule, time) => {
    const start = performance.now();
    const result = days.map((dayStr) => {
        const weekday = dayOfWeek[new Date(dayStr).getDay()];
        return { ...baseSchedule, [weekday]: time };
    });
    const end = performance.now();
    console.log(
        `createScheduleForDays executes in: ${(end - start).toFixed(3)} ms`
    );
    return result;
};

const handleArr = (schedules) => {
    if (!Array.isArray(schedules) || schedules.length === 0) return [];

    const output = [];
    const currentMonday = getCurrentMonday();
    const last = schedules[schedules.length - 1];

    if (last.days?.length) {
        schedules.push({
            time: '00:00:00',
            action: false,
            dimming: 0,
            isEnabled: true,
            firstDay: getNextMonday(last.firstDay),
            days: [],
        });
    }

    for (const sch of schedules) {
        if (!sch.isEnabled) continue;

        if (sch.firstDay !== currentMonday) {
            sch.isEnabled = new Date(sch.firstDay) > new Date(currentMonday);
            continue;
        }

        const baseSchedule = {
            Type: 'Weekly',
            Action: sch.action ? 'Relay On' : 'Relay OFF',
            ...(typeof sch.dimming === 'number' && { Dimming: sch.dimming }),
        };

        const scheduleEntries = createScheduleForDays(
            sch.days,
            baseSchedule,
            sch.time
        );

        if (output.length + scheduleEntries.length <= 32) {
            output.push(...scheduleEntries);
            sch.isEnabled = false;
        }
    }

    console.log(JSON.stringify(output, null, 2));
    console.log(`Total schedules: ${output.length}`);
    return output;
};

// Measure full execution time
const start = performance.now();
handleArr(arrSchedules);
const end = performance.now();

console.log(`Total execution time: ${(end - start).toFixed(3)} ms`);
