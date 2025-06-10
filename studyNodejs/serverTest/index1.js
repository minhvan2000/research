/* This file will handle schedule of the device */

import isEqual from 'lodash/isEqual.js';
import { performance } from 'node:perf_hooks';

const arr1 = [
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:00',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:01',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:02',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:03',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:04',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:05',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:06',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:07',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:08',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:09',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:10',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:11',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:12',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:13',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:14',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:15',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:16',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:17',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:18',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:19',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:20',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:21',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:22',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:23',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:24',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:25',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:26',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:27',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:28',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:29',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:30',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:31',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:32',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:33',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:34',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:35',
    },
];

const arr2 = [
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:00',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:01',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:02',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:03',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:04',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:05',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:06',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:07',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:08',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:09',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:10',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:11',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:12',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:13',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:14',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:15',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:16',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:17',
    },
];

const arr3 = [
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:18',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:19',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:20',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:21',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:22',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:23',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:24',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:25',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:26',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:27',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:28',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:29',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:30',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:31',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:32',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:33',
    },
    {
        Type: 'Weekly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:34',
    },
    {
        Type: 'Weekly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:35',
    },
];

const arr4 = [
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:00',
    },
    {
        Type: 'Hourly',
        Action: 'Relay OFF',
        Dimming: 0,
        Everyday: '00:45:01',
    },
    {
        Type: 'Hourly',
        Action: 'Relay On',
        Dimming: 100,
        Everyday: '00:45:02',
    },
];

const result = [];

// Check if array B is subset of array A
const isSubsetLodash = (a, b) => {
    return b.every((bItem) => a.some((aItem) => isEqual(aItem, bItem)));
};

const handleArr = (oldSch, newSch) => {
    if (!newSch.length) return [];

    const newSchWithStatus = newSch.map((val) => ({ ...val, status: 3 }));
    if (!oldSch.length) return [...newSchWithStatus];

    const oldSchData = oldSch.map(({ status, ...val }) => val);

    const schPending = oldSch.some((val) => val.status === 1);
    const isCheckSub = isSubsetLodash(oldSchData, newSch);

    const output = [];

    if (schPending && isCheckSub) {
        for (const oldItem of oldSch) {
            const { status, ...oldData } = oldItem;

            const matchNew = newSch.find((val) => {
                return isEqual(oldData, val);
            });

            if (matchNew) {
                output.push({ ...matchNew, status: 3 });
            } else {
                output.push(oldItem);
            }
        }
    } else if (schPending && !isCheckSub) {
        const failOldSch = oldSch.map((val) => ({ ...val, status: 2 }));

        output.push(...failOldSch, ...newSchWithStatus);
    } else if (!schPending && !isCheckSub) {
        output.push(...oldSch, ...newSchWithStatus);
    }

    console.log(JSON.stringify(output) === JSON.stringify(oldSch));

    if (JSON.stringify(output) === JSON.stringify(oldSch)) {
        output.length = 0;
    }

    console.log(JSON.stringify(output));

    return output;
};

//* Case1: have both status 3 and 1 => input is sub schedule with status 3
// result.push(
//     ...arr2.map((val) => {
//         return { ...val, status: 3 };
//     })
// );

// result.push(
//     ...arr3.map((val) => {
//         return { ...val, status: 1 };
//     })
// );

// const start1 = performance.now();
// handleArr(result, arr3);
// const end1 = performance.now();

// console.log(
//     `Case1: have both status 3 and 1: ${(end1 - start1).toFixed(3)} ms`
// );

// //* Case2: only have status 3 => input is sub schedule with status 3
// result.length = 0;
// result.push(
//     ...arr1.map((val) => {
//         return { ...val, status: 3 };
//     })
// );

// const start2 = performance.now();
// handleArr(result, arr2);
// const end2 = performance.now();

// console.log(`Case2: only have status 3: ${(end2 - start2).toFixed(3)} ms`);

// //* Case3: only have status 1 => input is sub schedule with status 3
// result.length = 0;
// result.push(
//     ...arr1.map((val) => {
//         return { ...val, status: 1 };
//     })
// );

// const start3 = performance.now();
// handleArr(result, arr2);
// const end3 = performance.now();

// console.log(`Case3: only have status 1: ${(end3 - start3).toFixed(3)} ms`);

// //* Case4: only have status 3 => input is outside schedule with status 3
// result.length = 0;
// result.push(
//     ...arr2.map((val) => {
//         return { ...val, status: 3 };
//     })
// );

// const start4 = performance.now();
// handleArr(result, arr3);
// const end4 = performance.now();

// console.log(`Case4: only have status 3: ${(end4 - start4).toFixed(3)} ms`);

// //* Case5: only have status 1 => input is outside schedule with status 3
// result.length = 0;
// result.push(
//     ...arr2.map((val) => {
//         return { ...val, status: 1 };
//     })
// );

// const start5 = performance.now();
// handleArr(result, arr3);
// const end5 = performance.now();

// console.log(`Case5: only have status 1: ${(end5 - start5).toFixed(3)} ms`);

// //* Case6: is empty => input is outside schedule with status 3
// result.length = 0;

// const start6 = performance.now();
// handleArr(result, arr2);
// const end6 = performance.now();

// console.log(`Case6: is empty: ${(end6 - start6).toFixed(3)} ms`);

//* Case7
result.push(
    ...[
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 20,
            Everyday: '00:02:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:04:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 40,
            Everyday: '00:06:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:08:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 60,
            Everyday: '00:10:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:12:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 80,
            Everyday: '00:14:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:16:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 100,
            Everyday: '00:18:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:20:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 20,
            Everyday: '00:22:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:24:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 40,
            Everyday: '00:26:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:28:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 60,
            Everyday: '00:30:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:32:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 80,
            Everyday: '00:34:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:36:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 100,
            Everyday: '00:38:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:40:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 20,
            Everyday: '00:42:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:44:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 40,
            Everyday: '00:46:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:48:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 60,
            Everyday: '00:50:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:52:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 80,
            Everyday: '00:54:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay OFF',
            Dimming: 0,
            Everyday: '00:56:00',
            status: 1,
        },
        {
            Type: 'Hourly',
            Action: 'Relay On',
            Dimming: 20,
            Everyday: '00:58:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay OFF',
            Dimming: 0,
            Sunday: '08:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay On',
            Dimming: 40,
            Monday: '02:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay OFF',
            Dimming: 0,
            Tuesday: '03:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay On',
            Dimming: 60,
            Wednesday: '04:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay OFF',
            Dimming: 0,
            Thursday: '05:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay On',
            Dimming: 80,
            Friday: '06:00:00',
            status: 1,
        },
        {
            Type: 'Weekly',
            Action: 'Relay OFF',
            Dimming: 0,
            Saturday: '07:00:00',
            status: 1,
        },
    ]
);

const arrTest = [
    { Type: 'Hourly', Everyday: '00:38:00', Action: 'Relay On', Dimming: 100 },
    { Type: 'Hourly', Everyday: '00:40:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Hourly', Everyday: '00:42:00', Action: 'Relay On', Dimming: 20 },
    { Type: 'Hourly', Everyday: '00:44:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Hourly', Everyday: '00:46:00', Action: 'Relay On', Dimming: 40 },
    { Type: 'Hourly', Everyday: '00:48:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Hourly', Everyday: '00:50:00', Action: 'Relay On', Dimming: 60 },
    { Type: 'Hourly', Everyday: '00:52:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Hourly', Everyday: '00:54:00', Action: 'Relay On', Dimming: 80 },
    { Type: 'Hourly', Everyday: '00:56:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Hourly', Everyday: '00:58:00', Action: 'Relay On', Dimming: 20 },
    { Type: 'Weekly', Sunday: '08:00:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Weekly', Monday: '02:00:00', Action: 'Relay On', Dimming: 40 },
    { Type: 'Weekly', Tuesday: '03:00:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Weekly', Wednesday: '04:00:00', Action: 'Relay On', Dimming: 60 },
    { Type: 'Weekly', Thursday: '05:00:00', Action: 'Relay OFF', Dimming: 0 },
    { Type: 'Weekly', Friday: '06:00:00', Action: 'Relay On', Dimming: 80 },
    { Type: 'Weekly', Saturday: '07:00:00', Action: 'Relay OFF', Dimming: 0 },
];

const start6 = performance.now();
handleArr(result, arrTest);
const end6 = performance.now();

console.log(`Case6: ${start6} ms`);
console.log(`Case6: ${end6} ms`);
console.log(`Case6: is empty: ${(end6 - start6).toFixed(3)} ms`);
