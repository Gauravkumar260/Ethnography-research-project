2026-03-04T00:32:51.754685174Z ==> Downloading cache...
2026-03-04T00:32:51.794848057Z ==> Cloning from https://github.com/Gauravkumar260/Ethnography-research-project
2026-03-04T00:32:59.9233269Z ==> Checking out commit c9082806b2c97c45c861cbbea2a53594fed04fba in branch main
2026-03-04T00:33:05.617657409Z ==> Downloaded 203MB in 2s. Extraction took 4s.
2026-03-04T00:33:23.00754025Z ==> Using Node.js version 22.16.0 (default)
2026-03-04T00:33:23.031621466Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
2026-03-04T00:33:23.15623142Z ==> Running build command 'npm install'...
2026-03-04T00:33:24.924243316Z 
2026-03-04T00:33:24.924273668Z > server@1.0.0 postinstall
2026-03-04T00:33:24.924280728Z > npm run build
2026-03-04T00:33:24.924285589Z 
2026-03-04T00:33:25.082660867Z 
2026-03-04T00:33:25.082693089Z > server@1.0.0 build
2026-03-04T00:33:25.082717371Z > tsc && tsc-alias
2026-03-04T00:33:25.082723642Z 
2026-03-04T00:33:30.194766257Z 
2026-03-04T00:33:30.194825412Z up to date, audited 396 packages in 7s
2026-03-04T00:33:30.194831332Z 
2026-03-04T00:33:30.194835922Z 61 packages are looking for funding
2026-03-04T00:33:30.194840813Z   run `npm fund` for details
2026-03-04T00:33:30.200145837Z 
2026-03-04T00:33:30.20017997Z 6 vulnerabilities (3 low, 1 moderate, 2 high)
2026-03-04T00:33:30.20018475Z 
2026-03-04T00:33:30.200189501Z To address issues that do not require attention, run:
2026-03-04T00:33:30.200193801Z   npm audit fix
2026-03-04T00:33:30.200198071Z 
2026-03-04T00:33:30.200202242Z To address all issues (including breaking changes), run:
2026-03-04T00:33:30.200206842Z   npm audit fix --force
2026-03-04T00:33:30.200210672Z 
2026-03-04T00:33:30.200215383Z Run `npm audit` for details.
2026-03-04T00:33:50.031088397Z ==> Uploading build...
2026-03-04T00:34:04.688139711Z ==> Uploaded in 11.9s. Compression took 2.8s
2026-03-04T00:34:07.708429785Z ==> Build successful 🎉
2026-03-04T00:34:25.898674782Z ==> Deploying...
2026-03-04T00:34:26.128574436Z ==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
2026-03-04T00:34:53.47478234Z ==> Running 'node server.js'
2026-03-04T00:34:59.47154272Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"email":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.471564001Z (Use `node --trace-warnings ...` to show where the warning was created)
2026-03-04T00:34:59.471796767Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"studentId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.47190506Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.471943051Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.472081815Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"userId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.472140777Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"code":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.472185448Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"refreshTokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:34:59.773527737Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:34:59.773553878Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:34:59.773557118Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:34:59.825604571Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:34:59.825619331Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:34:59.825622611Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:34:59.93616591Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:34:59.93618762Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:34:59.93619085Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:00.087722003Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:00.087741864Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:00.087745024Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:00.289079189Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:00.28910402Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:00.28910851Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:00.414988441Z undefined Cannot read properties of undefined (reading 'bold')
2026-03-04T00:35:02.960447181Z ==> Exited with status 1
2026-03-04T00:35:02.96317127Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2026-03-04T00:35:05.929424296Z ==> Running 'node server.js'
2026-03-04T00:35:11.829245534Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"email":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.829276545Z (Use `node --trace-warnings ...` to show where the warning was created)
2026-03-04T00:35:11.830139018Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"studentId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.830156259Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.830177099Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.830280792Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"userId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.830338004Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"code":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:11.830419976Z (node:53) [MONGOOSE] Warning: Duplicate schema index on {"refreshTokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:12.221874984Z [ioredis] Unhandled error event: AggregateError [ETIMEDOUT]: 
2026-03-04T00:35:12.221898604Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:12.221903204Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:12.27553977Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:12.2755591Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:12.27556226Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:12.383142749Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:12.38316527Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:12.38317077Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:12.535385841Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:12.535419872Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:12.535426652Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:12.737377294Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:12.737401794Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:12.737405144Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:12.876605135Z undefined Cannot read properties of undefined (reading 'bold')
2026-03-04T00:35:31.113305566Z ==> Running 'node server.js'
2026-03-04T00:35:32.183623015Z ==> No open ports detected, continuing to scan...
2026-03-04T00:35:32.596318266Z ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
2026-03-04T00:35:37.210681436Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"email":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.210711517Z (Use `node --trace-warnings ...` to show where the warning was created)
2026-03-04T00:35:37.210955584Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"studentId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.210976774Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.211041636Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"tokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.21116949Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"userId":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.211205011Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"code":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.211288743Z (node:71) [MONGOOSE] Warning: Duplicate schema index on {"refreshTokenHash":1} found. This is often due to declaring an index using both "index: true" and "schema.index()". Please remove the duplicate index definition.
2026-03-04T00:35:37.510092154Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:37.510111374Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:37.510117885Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:37.603252394Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:37.603278675Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:37.603296675Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:37.705939311Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:37.705964222Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:37.705969992Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:37.858462271Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:37.858482931Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:37.858487641Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:38.061491061Z [ioredis] Unhandled error event: AggregateError [ECONNREFUSED]: 
2026-03-04T00:35:38.061509311Z     at internalConnectMultiple (node:net:1139:18)
2026-03-04T00:35:38.061514932Z     at afterConnectMultiple (node:net:1714:7)
2026-03-04T00:35:38.149752249Z undefined Cannot read properties of undefined (reading 'bold')