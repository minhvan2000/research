import { CronExpressionParser } from 'cron-parser';

const options = {
    tz: 'Europe/Paris',
};

const start = performance.now();
try {
    const interval = CronExpressionParser.parse('0 0 0 * * 1', options);

    console.log('Next:', interval.next().toString());
} catch (err) {
    s;
    console.log('Error:', err.message);
}
const end = performance.now();

console.log(`Start: ${start} ms`);
console.log(`End: ${end} ms`);
console.log(`Executes: ${(end - start).toFixed(3)} ms`);
