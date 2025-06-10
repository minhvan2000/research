import { performance } from 'node:perf_hooks';

const arrSchedules = [
    {
        day: 21,
        month: 4,
        year: 2025,
        time: '16:30:00',
        dates: '1111111',
        action: true,
        brightness: 100,
        isEnabled: false,
    },
    {
        day: 28,
        month: 4,
        year: 2025,
        time: '23:59:00',
        dates: '0000000',
        action: false,
        brightness: 0,
        isEnabled: true,
    },
    {
        day: 5,
        month: 5,
        year: 2025,
        time: '18:00:00',
        dates: '0111110',
        action: true,
        brightness: 100,
        isEnabled: true,
    },
    {
        day: 12,
        month: 5,
        year: 2025,
        time: '20:00:00',
        dates: '0110110',
        isEnabled: true,
    },
    {
        day: 19,
        month: 5,
        year: 2025,
        time: '05:30:00',
        dates: '0111101',
        action: true,
        brightness: 100,
        isEnabled: true,
    },
    {
        day: 26,
        month: 5,
        year: 2025,
        time: '18:00:00',
        dates: '0011110',
        action: false,
        brightness: 0,
        isEnabled: true,
    },
    {
        day: 2,
        month: 6,
        year: 2025,
        time: '19:20:00',
        dates: '0101110',
        action: true,
        brightness: 100,
        isEnabled: true,
    },
    {
        day: 9,
        month: 6,
        year: 2025,
        time: '03:05:00',
        dates: 0b0111011,
        action: true,
        brightness: 100,
        isEnabled: true,
    },
];

const handleBitsString = ({ bitsString, objSch, time }) => {
    let result = [];
    const bits = parseInt(bitsString, 2);

    if ((bits & 0b1000000) === 64) result.push({ ...objSch, Monday: time });
    if ((bits & 0b0100000) === 32) result.push({ ...objSch, Tuesday: time });
    if ((bits & 0b0010000) === 16) result.push({ ...objSch, Wednesday: time });
    if ((bits & 0b0001000) === 8) result.push({ ...objSch, Thursday: time });
    if ((bits & 0b0000100) === 4) result.push({ ...objSch, Friday: time });
    if ((bits & 0b0000010) === 2) result.push({ ...objSch, Saturday: time });
    if ((bits & 0b0000001) === 1) result.push({ ...objSch, Sunday: time });

    return result;
};

const handleArr = (serverSch) => {
    if (!serverSch?.length) return [];
    const nowDate = new Date().getTime();
    const schEnable = serverSch.filter(
        (val) =>
            new Date(
                `${val.month}/${val.day}/${val.year} 00:00:00`
            ).getTime() <= nowDate && val.isEnabled
    );

    const output = [];

    for (const sch of schEnable) {
        const lengthCurrent = output.length;

        const objSch = {
            Type: 'Weekly',
            Action: sch.action ? 'Relay On' : 'Relay OFF',
        };

        if (typeof sch.brightness === 'number') {
            objSch.Dimming = sch.brightness;
        }

        const result = handleBitsString({
            bitsString: sch.dates,
            objSch,
            time: sch.time,
        });

        const lengthResult = result.length;

        console.log(result);
        console.log(lengthCurrent + lengthResult <= 32);

        if (lengthCurrent + lengthResult <= 32) {
            output.push(...result);
            sch.isEnabled = false;
        }
    }

    console.log(JSON.stringify(output));
    console.log(output.length);

    return output;
};

//{
//  "Type": "Weekly",
//  "Thursday": "00:08:00",
//  "Action": "Relay OFF"
//}

const start6 = performance.now();
handleArr(arrSchedules);
const end6 = performance.now();

console.log(`Start: ${start6} ms`);
console.log(`End: ${end6} ms`);
console.log(`Executes: ${(end6 - start6).toFixed(3)} ms`);
