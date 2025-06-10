import { performance } from 'node:perf_hooks';
const SCH_DEVICE = {
    ESO: '0D',
    RSO36: '09',
    RSO18: '00',
};

const SCH_TYPE = {
    Hourly: '03',
    Daily: '04',
    Weekly: '05',
};

const COMM_ON = '01';
const COMM_OFF = '00';

const SCH_DAY_OF_WEEK = {
    Sunday: '00',
    Monday: '01',
    Tuesday: '02',
    Wednesday: '03',
    Thursday: '04',
    Friday: '05',
    Saturday: '06',
    Everyday: 'FF',
};

const arrData = [
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

const decimalToHex = (dec, padding = 2) => {
    return Number(dec).toString(16).toUpperCase().padStart(padding, '0');
};

const parseFrame = ({ arrSch = [], type = '00' }) => {
    if (!arrSch.length) return [''];

    const listPayload = arrSch.map((sch) => {
        let payload = SCH_TYPE[sch.Type];

        const timeKey = Object.keys(sch).find(
            (k) => !['Type', 'Action', 'Dimming'].includes(k)
        );
        payload += SCH_DAY_OF_WEEK[timeKey];

        const timeParts = sch[timeKey].split(':');
        for (const part of timeParts) {
            payload += decimalToHex(part);
        }

        const isOff = sch.Action.toLowerCase() === 'relay off';

        if (isOff) {
            payload += COMM_OFF;
        } else if (SCH_DEVICE.ESO === type) {
            const dimming = Math.round((sch.Dimming || 0) / 5) * 4 + 1;
            payload += decimalToHex(dimming);
        } else {
            payload += COMM_ON;
        }

        return payload;
    });

    // Split into chunks of max 72 characters
    const results = listPayload.reduce(
        (acc, item) => {
            const last = acc[acc.length - 1] || '';
            if (last.length + item.length > 72) {
                acc.push(item);
            } else {
                acc[acc.length - 1] = last + item;
            }
            return acc;
        },
        ['']
    );

    console.log(results);
    return results;
};

const start = performance.now();
parseFrame({ arrSch: arrData });
const end = performance.now();
console.log(`Total execution time: ${(end - start).toFixed(3)} ms`);
