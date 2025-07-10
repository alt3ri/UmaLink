const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const USERNAME = 'YOUR_WINDOWS_USERNAME'; //the windows account name, for example 'HP', Admin,...
const TARGET_PATH = 'C:\\Users\\' + USERNAME + '\\AppData\\LocalLow\\Cygames\\Umamusume';
const GLOBAL_SOURCE = 'E:\\UmaGL\\Umamusume'; //change to your desire global version data path
const JAPAN_SOURCE = 'E:\\UmaJP\\Umamusume'; //change to your desire DMM version data path


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkAndDeleteExistingLink() {
    try {
        
        if (fs.existsSync(TARGET_PATH)) {
            const stats = fs.lstatSync(TARGET_PATH);

            
            if (stats.isSymbolicLink() || stats.isDirectory()) {
                console.log(`\nFound existing link/directory at: ${TARGET_PATH}`);
                console.log('Removing existing link...');

                
                try {
                    fs.rmSync(TARGET_PATH, { recursive: true, force: true });
                    console.log('Successfully removed existing link/directory');
                } catch (error) {
                    
                    try {
                        execSync(`rmdir "${TARGET_PATH}" /s /q`, { stdio: 'pipe' });
                        console.log('Successfully removed existing link/directory');
                    } catch (cmdError) {
                        console.log('Failed to remove existing link:', cmdError.message);
                        return false;
                    }
                }
            }
        } else {
            console.log('ℹNo existing link found at target location');
        }
        return true;
    } catch (error) {
        console.log('Error checking existing link:', error.message);
        return false;
    }
}

function createJunctionLink(sourcePath) {
    try {
        console.log(`\nCreating junction link...`);
        console.log(`From: ${TARGET_PATH}`);
        console.log(`To: ${sourcePath}`);

        
        if (!fs.existsSync(sourcePath)) {
            console.log(`Source path does not exist: ${sourcePath}`);
            console.log('Please make sure the source directory exists before creating the link');
            return false;
        }

        
        const command = `mklink /J "${TARGET_PATH}" "${sourcePath}"`;
        console.log(`\nExecuting: ${command}`);

        execSync(command, { stdio: 'inherit' });
        console.log('\nJunction link created successfully!');
        return true;
    } catch (error) {
        console.log('\nFailed to create junction link:', error.message);
        console.log('ℹMake sure you are running this script as Administrator');
        return false;
    }
}

function showMenu() {
    console.log('\n' + '='.repeat(50));
    console.log('Umamusume Link Manager');
    console.log('='.repeat(50));
    console.log('\nSelect an option:');
    console.log('1. Global - Link to ' + GLOBAL_SOURCE);
    console.log('2. Japan - Link to ' + JAPAN_SOURCE);
    console.log('3. Exit');
    console.log('\n' + '='.repeat(50));
}

function promptUser() {
    showMenu();

    rl.question('\nEnter your choice (1, 2, or 3): ', (answer) => {
        const choice = answer.trim();

        switch (choice) {
            case '1':
                console.log('\n- Selected: Global option');
                if (checkAndDeleteExistingLink()) {
                    createJunctionLink(GLOBAL_SOURCE);
                }
                rl.close();
                break;

            case '2':
                console.log('\n- Selected: Japan option');
                if (checkAndDeleteExistingLink()) {
                    createJunctionLink(JAPAN_SOURCE);
                }
                rl.close();
                break;

            case '3':
                console.log('\n- Goodbye!');
                rl.close();
                break;

            default:
                console.log('\n- Invalid choice. Please enter 1, 2, or 3.');
                promptUser();
                break;
        }
    });
}


function main() {
    console.log('Umamusume link...');

    
    if (process.platform !== 'win32') {
        console.log('This script is designed for Windows only');
        process.exit(1);
    }

    
    const parentDir = path.dirname(TARGET_PATH);
    if (!fs.existsSync(parentDir)) {
        console.log(`Creating parent directory: ${parentDir}`);
        try {
            fs.mkdirSync(parentDir, { recursive: true });
        } catch (error) {
            console.log('Failed to create parent directory:', error.message);
            process.exit(1);
        }
    }

    promptUser();
}


rl.on('close', () => {
    console.log('\nScript finished.');
    process.exit(0);
});


process.on('SIGINT', () => {
    console.log('\n\nScript interrupted by user');
    rl.close();
});


main();