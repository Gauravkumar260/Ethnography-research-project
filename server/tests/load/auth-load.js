import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    // 500 concurrent logins
    steady_state: {
      executor: 'constant-vus',
      vus: 500,
      duration: '5m',
    },
    // 2000 deadline rush
    deadline_rush: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 2000 },
        { duration: '3m', target: 2000 },
        { duration: '1m', target: 0 },
      ],
      startTime: '5m', // start after steady state
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<300', 'p(99)<500'], // 95% < 300ms, 99% < 500ms
    http_req_failed: ['rate<0.001'], // error rate < 0.1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000/api';

export default function () {
  const email = \`test-user-\${__VU}@university.edu\`;
  const password = 'SuperSecurePassword123!';

  const loginRes = http.post(\`\${BASE_URL}/auth/login\`, JSON.stringify({
    email: email,
    password: password,
    deviceFingerprint: \`k6-test-device-\${__VU}\`
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login status is 200 or 401': (r) => r.status === 200 || r.status === 401,
  });

  sleep(1);
}
