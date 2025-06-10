import { performance } from 'node:perf_hooks';

const getTimeCurrentByIANA = (timeZone) => {
    try {
        const now = new Date();

        const options = {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        const formatter = new Intl.DateTimeFormat('en-GB', options);

        return formatter.format(now);
    } catch (err) {
        console.error('Invalid time zone:', timeZone);
        return null;
    }
};

const start = performance.now();
const result = getTimeCurrentByIANA('Europe/Paris');
const end = performance.now();

console.log(result);
console.log(new Date('04/27/2025').getDay());

console.log(`Start: ${start} ms`);
console.log(`End: ${end} ms`);
console.log(`Executes: ${(end - start).toFixed(3)} ms`);
