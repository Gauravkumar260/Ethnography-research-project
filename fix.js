const fs = require('fs');
const files = [
  'client/src/components/auth/MFASetup.tsx',
  'client/src/components/auth/PasswordStrengthMeter.tsx',
  'client/src/components/auth/SessionsTable.tsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\\`/g, '`');
    content = content.replace(/\\\$/g, '$');
    content = content.replace(/\\\\n/g, '\\n');
    content = content.replace(/\\\\D/g, '\\D');
    fs.writeFileSync(f, content);
  }
});
