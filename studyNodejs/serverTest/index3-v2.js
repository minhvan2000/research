import { performance } from 'node:perf_hooks';

import isEqual from 'lodash/isEqual.js';

const arrSchedules = [
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Monday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Tuesday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Wednesday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Thursday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Friday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Saturday: '16:30:00',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Sunday: '16:30:00',
    },
];

const arrOldSchedules = [
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

const isSubsetLodash = (a, b) => {
    return a.some(({ isEnabled, ...aItem }) => isEqual(aItem, b));
};

const formatDate = (date) => date.toISOString().split('T')[0];

const getCurrentMonday = () => {
    const now = new Date();
    const diff = (now.getDay() + 6) % 7; // Monday = 0
    now.setDate(now.getDate() - diff);
    return formatDate(now);
};

const getWeekday = (date) => {
    const now = new Date(getCurrentMonday());
    const getDay = now.getDay();

    const day = getDay - date;

    const diff = day > 0 ? now.getDate() - day : now.getDate() - day;

    now.setDate(diff);

    return formatDate(now);
};

const handleArr = (schedules) => {
    if (!Array.isArray(schedules) || schedules.length === 0) return [];

    const currentMonday = getCurrentMonday();

    const [Type, Action, Dimming, ...time] = Object.keys(schedules[0]);

    const output = {
        time: schedules[0][time[0]],
        action: schedules[0][Action].toLowerCase() === 'relay on',
        firstDay: currentMonday,
        days: [],
    };

    if (typeof schedules[0][Dimming] === 'number') {
        output.dimming = schedules[0][Dimming];
    }

    for (const item of schedules) {
        const [Type, Action, Dimming, ...time] = Object.keys(item);

        const getIndex = dayOfWeek.indexOf(time[0]);

        if (getIndex >= 0) {
            const days = getWeekday(getIndex || 7);
            output.days.push(days);
        }
    }

    return output;
};

const compareSchedule = () => {
    const newSch = handleArr(arrSchedules);
    const isCompare = isSubsetLodash(arrOldSchedules, newSch);

    return isCompare;
};

// Measure full execution time
const start = performance.now();
compareSchedule();
const end = performance.now();

console.log(`Total execution time: ${(end - start).toFixed(3)} ms`);
