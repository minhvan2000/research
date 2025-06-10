import { performance } from 'node:perf_hooks';
import { appendFile } from 'node:fs';

const dataMessage = []

const handleDataMessage = (dataMessage) => {
    for (const item of dataMessage) {
        if (item.dataDecoded[1]) {
            item.type = item.dataDecoded[1]?.value.replace(/\s/ig, '');
        }
    }
    appendFile('message.json', JSON.stringify(dataMessage), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      }); 
    return ;
};

const start = performance.now();
const result = handleDataMessage(dataMessage);
const end = performance.now();

console.log(result);

console.log(`Start: ${start} ms`);
console.log(`End: ${end} ms`);
console.log(`Executes: ${(end - start).toFixed(3)} ms`);
