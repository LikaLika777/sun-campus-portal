/** Simulate network latency (300–800ms) */
export function simulateLatency(): Promise<void> {
  const delay = 300 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/** Generate a mock reference number */
export function generateReference(prefix: string): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(1000 + Math.random() * 9000));
  return `${prefix}-${year}-${num}`;
}

/** Generate a secure-looking reference code */
export function generateSecureCode(prefix: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${code}`;
}
