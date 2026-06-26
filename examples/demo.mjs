/**
 * Self-driving demo for the README recording (VHS). Key-free and deterministic.
 * Report content is faithful to the real run in CASES.md. Run: node examples/demo.mjs
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", b: "\x1b[1m",
  green: "\x1b[38;5;42m", red: "\x1b[38;5;203m", yellow: "\x1b[38;5;221m",
  grey: "\x1b[90m", cyan: "\x1b[36m",
};
async function line(s = "", d = 55) { process.stdout.write(s + "\n"); await sleep(d); }
async function type(s, speed = 12) { for (const ch of s) { process.stdout.write(ch); await sleep(speed); } process.stdout.write(C.reset + "\n"); }

async function main() {
  await line(`${C.green}${C.b}  semver-guard${C.reset} ${C.dim}— catch breaking changes before you call it a patch${C.reset}\n`, 400);

  await type(`${C.cyan}$${C.reset} git diff ${C.dim}src/index.ts${C.reset}`, 22);
  await sleep(120);
  await line(`${C.red}- export function fetchUser(id) { ... }${C.reset}`, 55);
  await line(`${C.green}+ export function fetchUser(id, opts) { ... }   ${C.dim}// opts required${C.reset}`, 55);
  await line(`${C.red}- export const parseConfig = ...${C.reset}`, 55);
  await line(`${C.green}+ export const withRetry = ...${C.reset}`, 55);
  await line();
  await type(`${C.cyan}$${C.reset} npm version ${C.b}patch${C.reset}  ${C.dim}# about to ship...${C.reset}`, 20);
  await line();
  await type(`${C.cyan}$${C.reset} ${C.b}/semver-guard${C.reset}`, 24);
  await sleep(300);
  await line(`${C.dim}  diffing the public surface…${C.reset}`, 650);
  await line();

  await line(`${C.b}semver-guard${C.reset} ${C.dim}— 3 changes to the public surface${C.reset}`, 250);
  await line(`  ${C.red}✗ breaking${C.reset}  removed export ${C.cyan}parseConfig${C.reset}                ${C.red}→ major${C.reset}`, 340);
  await line(`  ${C.red}✗ breaking${C.reset}  ${C.cyan}fetchUser${C.reset} now requires ${C.cyan}opts${C.reset}            ${C.red}→ major${C.reset}  ${C.dim}(make opts optional to avoid)${C.reset}`, 340);
  await line(`  ${C.green}✓ additive${C.reset}  new export ${C.cyan}withRetry${C.reset}                  ${C.green}→ minor${C.reset}`, 340);
  await line();
  await line(`${C.b}This is a MAJOR bump. You called it a patch.${C.reset}`, 200);
  await line();
  await sleep(400);
  await line(`${C.dim}  the version bump shouldn't lie about what changed.${C.reset}`, 120);
  await line(`${C.green}  github.com/ryanda9910/semver-guard${C.reset}`, 100);
  await line();
}
main();
