import { spawn } from 'child_process';
import { format } from 'date-fns';
import { Queue } from 'bullmq';

export const redisOptions = { host: 'localhost', port: 6379 };
const backupQueue = new Queue('backupQueue', { connection: redisOptions });

const dbName = 'admin';
const compressionType = '--gzip';

const getFormattedDateTime = () => {
    return format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
};

export const backupDatabase = async () => {
    return new Promise((resolve, reject) => {
        const currentDateTime = getFormattedDateTime();
        const backupFileName = `./backup-${currentDateTime}.gz`;

        console.log(`Starting database backup: ${backupFileName}`);

        const backupProcess = spawn('mongodump', [
            `--db=${dbName}`,
            `--archive=${backupFileName}`,
            compressionType,
        ]);

        backupProcess.on('error', (err) => {
            reject(new Error(`Failed to start backup process: ${err.message}`));
        });

        backupProcess.on('exit', (code, signal) => {
            if (code) {
                reject(new Error(`Backup process exited with code ${code}`));
            } else if (signal) {
                reject(
                    new Error(
                        `Backup process was terminated with signal ${signal}`
                    )
                );
            } else {
                console.log(
                    `Database "${dbName}" successfully backed up to ${backupFileName}`
                );
                resolve();
            }
        });
    });
};

// Initiate the database backup
backupDatabase().catch((err) => console.error(err));

async function addJob(job) {
    const options = { repeat: { every: 60000 } };
    await backupQueue.add(job.name, job, options);
}

await addJob({ name: 'backupMongoDB' });
