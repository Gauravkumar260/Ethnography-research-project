const fs = require('fs');

const rateLimitPath = 'server/src/lib/auth/rateLimit.ts';
let rateLimitCode = fs.readFileSync(rateLimitPath, 'utf8');
// Replace all escaped backticks with real backticks
rateLimitCode = rateLimitCode.replace(/\\`/g, '`');
// Replace any non-standard single quotes or double quotes that look like they should be backticks,
// although the prompt says "either escaped as \` or replaced with an invalid character".
// Let's just fix the exact lines requested by the user, just to be sure.

// Line 28
rateLimitCode = rateLimitCode.replace(/const redisKey = .ratelimit:\$\{key\}.;/, 'const redisKey = `ratelimit:${key}`;');
// Line 44
rateLimitCode = rateLimitCode.replace(/const redisKey = .ratelimit:fail:\$\{key\}.;/, 'const redisKey = `ratelimit:fail:${key}`;');
// Line 50
rateLimitCode = rateLimitCode.replace(/await redis\.del\(.ratelimit:\$\{key\}.\);/, 'await redis.del(`ratelimit:${key}`);');
// Line 54-62
rateLimitCode = rateLimitCode.replace(/key: .login:ip:\$\{ip\}./, 'key: `login:ip:${ip}`');
rateLimitCode = rateLimitCode.replace(/key: .login:email:\$\{email\}./, 'key: `login:email:${email}`');
rateLimitCode = rateLimitCode.replace(/key: .register:ip:\$\{ip\}./, 'key: `register:ip:${ip}`');
rateLimitCode = rateLimitCode.replace(/key: .refresh:ip:\$\{ip\}./, 'key: `refresh:ip:${ip}`');
rateLimitCode = rateLimitCode.replace(/key: .pwdreset:email:\$\{email\}./, 'key: `pwdreset:email:${email}`');
rateLimitCode = rateLimitCode.replace(/key: .pwdreset:ip:\$\{ip\}./, 'key: `pwdreset:ip:${ip}`');
rateLimitCode = rateLimitCode.replace(/key: .verifyresend:user:\$\{userId\}./, 'key: `verifyresend:user:${userId}`');
rateLimitCode = rateLimitCode.replace(/key: .mfa:\$\{userId\}./, 'key: `mfa:${userId}`');
rateLimitCode = rateLimitCode.replace(/key: .api:\$\{ip\}./, 'key: `api:${ip}`');

fs.writeFileSync(rateLimitPath, rateLimitCode);

const riskEnginePath = 'server/src/lib/auth/riskEngine.ts';
let riskEngineCode = fs.readFileSync(riskEnginePath, 'utf8');
riskEngineCode = riskEngineCode.replace(/\\`/g, '`');
// Line 62
riskEngineCode = riskEngineCode.replace(/reasons\.push\(.Recent failed attempts: \$\{recentFailures\}.\);/, 'reasons.push(`Recent failed attempts: ${recentFailures}`);');
// Line 78
riskEngineCode = riskEngineCode.replace(/fetch\(.http:\/\/ip-api\.com\/json\/\$\{ip\}.\);/, 'fetch(`http://ip-api.com/json/${ip}`);');

fs.writeFileSync(riskEnginePath, riskEngineCode);

console.log('Fixed files');
