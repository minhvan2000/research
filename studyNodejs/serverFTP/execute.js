import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import readline from 'readline';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to check if a file is executable
function isExecutable(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.X_OK);
        return true;
    } catch (error) {
        return false;
    }
}

// Function to find executable files in a directory
function findExecutableFiles(directory) {
    const files = fs.readdirSync(directory);
    return files.filter(file => {
        const filePath = path.join(directory, file);
        return fs.statSync(filePath).isFile() && isExecutable(filePath);
    });
}

// Function to execute file with spawn and time measurement
function executeFile(filePath, parameter) {
    return new Promise((resolve, reject) => {
        // Start time measurement
        const startTime = process.hrtime();
        let output = '';
        let error = '';

        // Execute the program with parameter
        const execute = spawn(filePath, [parameter]);
        
        execute.stdout.on('data', (data) => {
            output += data.toString();
            console.log(`Program output: ${data}`);
        });

        execute.stderr.on('data', (data) => {
            error += data.toString();
            console.error(`Program error: ${data}`);
        });

        execute.on('close', (code) => {
            // End time measurement
            const endTime = process.hrtime(startTime);
            const executionTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
            
            console.log(`Program exited with code ${code}`);
            console.log(`Execution Time: ${executionTime} ms`);

            // Resolve with execution results
            resolve({
                fileName: path.basename(filePath),
                output: output,
                error: error,
                exitCode: code,
                executionTime: executionTime
            });
        });

        execute.on('error', (err) => {
            reject(err);
        });
    });
}

// Main function to handle user input and execution
async function main() {
    const testDSTPath = path.join(__dirname, 'TestDST');

    // Check if TestDST directory exists
    if (!fs.existsSync(testDSTPath)) {
        console.error(`Error: Directory ${testDSTPath} does not exist`);
        process.exit(1);
    }

    // Find all executable files
    const executableFiles = findExecutableFiles(testDSTPath);
    
    if (executableFiles.length === 0) {
        console.error('No executable files found in the directory');
        process.exit(1);
    }

    // Display found executable files
    console.log('Found executable files:');
    executableFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });

    // Ask user for input
    rl.question('Enter the parameter for execution: ', async (parameter) => {
        if (!parameter) {
            console.error('Error: Parameter cannot be empty');
            rl.close();
            return;
        }

        // Array to store all execution results
        const executionResults = [];

        // Execute each file and store results
        for (const file of executableFiles) {
            const filePath = path.join(testDSTPath, file);
            console.log(`\nExecuting ${file}:`);
            try {
                const result = await executeFile(filePath, parameter);
                executionResults.push(result);
            } catch (err) {
                console.error(`Error executing ${file}:`, err);
                executionResults.push({
                    fileName: file,
                    output: '',
                    error: err.message,
                    exitCode: -1,
                    executionTime: 0
                });
            }
        }

        // Display summary of all results
        console.log('\nExecution Summary:');
        executionResults.forEach(result => {
            console.log(`\nFile: ${result.fileName}`);
            console.log(`Exit Code: ${result.exitCode}`);
            console.log(`Execution Time: ${result.executionTime} ms`);
            if (result.error) {
                console.log(`Error: ${result.error}`);
            }
        });

        // You can now use executionResults array for further processing
        // For example, save to file, analyze results, etc.
        
        rl.close();
    });
}

// Run the main function
main().catch(console.error); 