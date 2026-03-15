const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientSrc = path.join(__dirname, 'client/src');
const enJsonPath = path.join(__dirname, 'client/messages/en.json');

const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// recursively find all ts/tsx files
function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, files);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = getFiles(clientSrc);
const occurrences = [];
const usedPaths = new Set();

// very naive regex for useTranslations('Namespace') and t('key')
allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Match const t = useTranslations('Namespace')
    const iter = content.matchAll(/useTranslations\(['"]([^'"]+)['"]\)/g);
    for (const match of iter) {
        const ns = match[1];
        // Match t('key')
        const tIter = content.matchAll(/t\(['"]([^'"]+)['"]\)/g);
        for (const tMatch of tIter) {
            const key = tMatch[1];
            occurrences.push({ ns, key, file });
            usedPaths.add(`${ns}.${key}`);
        }
    }
});

let missing = 0;
let dead = 0;

console.log("--- MISSING ---");
occurrences.forEach(({ ns, key, file }) => {
    if (!enJson[ns] || !enJson[ns][key]) {
        console.log(`MISSING: ${ns}.${key} @ ${file.replace(__dirname, '')} — absent from en.json`);
        missing++;
    }
});

console.log("--- DEAD ---");
for (const ns in enJson) {
    for (const key in enJson[ns]) {
        if (typeof enJson[ns][key] === 'string') {
            const path = `${ns}.${key}`;
            if (!usedPaths.has(path)) {
                console.log(`DEAD: ${path} in en.json — no code reference`);
                dead++;
            }
        }
    }
}

console.log(`Final line only: "${missing} missing. ${dead} dead. 1 languages."`);
