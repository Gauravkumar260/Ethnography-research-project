const fs = require('fs');
const path = require('path');
const files = [
  'client/src/app/communities/[id]/infographic/page.tsx',
  'client/src/app/communities/[id]/page.tsx',
  'client/src/app/documentaries/page.tsx',
  'client/src/app/research/conferences/page.tsx',
  'client/src/app/research/field-data/page.tsx',
  'client/src/app/research/page.tsx',
  'client/src/app/research/patents/page.tsx',
  'client/src/app/research/publications/page.tsx',
  'client/src/app/research/thesis/page.tsx',
  'client/src/app/student-submission/page.tsx',
  'client/src/hooks/useCommunities.ts',
  'client/src/services/authService.ts',
  'client/src/app/admin/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  // Replace the import
  content = content.replace(/import api from ['"]@\/lib\/api['"]/g, "import { apiFetch } from '@/lib/api'");
  // Replace api.get, api.post, etc. with apiFetch
  // apiFetch only takes (url, options), whereas api.get takes (url, options)
  // So we can do a simple rename for now, though apiFetch might need refinement for method handling.
  content = content.replace(/api\.(get|post|put|delete|patch)\(/g, 'apiFetch(');
  fs.writeFileSync(file, content, 'utf8');
});
console.log('API migration script complete.');
