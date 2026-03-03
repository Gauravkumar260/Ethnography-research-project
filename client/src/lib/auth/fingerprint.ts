/**
 * Simple client-side device fingerprinting.
 * In a real-world ELITE system, use a library like FingerprintJS.
 */
export async function getDeviceFingerprint(): Promise<string> {
  const components = [
    window.navigator.userAgent,
    window.navigator.language,
    window.screen.colorDepth,
    window.screen.width + 'x' + window.screen.height,
    new Date().getTimezoneOffset(),
    // @ts-ignore
    window.navigator.deviceMemory,
    // @ts-ignore
    window.navigator.hardwareConcurrency,
  ];
  
  const data = components.join('|');
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
