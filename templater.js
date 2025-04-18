const fs = require('fs');
const path = require('path');

function copyRecursive(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destinationPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            copyRecursive(sourcePath, destinationPath);
        } else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}

const targetFolderName = process.argv[2];

if (!targetFolderName) {
    console.log('\x1b[31m%s\x1b[0m','[-]: Please provide a target folder name: npm start <folder-name> \n');
    process.exit(1);
}

const templateDir = path.join(__dirname, 'template');
const targetDir = path.join(__dirname, targetFolderName);

copyRecursive(templateDir, targetDir);

console.log('\x1b[32m%s\x1b[0m',`[+]: Project '${targetFolderName}' was created from the 'template' folder.\n`);
