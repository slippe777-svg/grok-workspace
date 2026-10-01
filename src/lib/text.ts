export function plural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}

export function norm(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’ʼ`']/g, "")
    .replace(/[.,!?;:()«»"“”]/g, " ")
    .replace(/[-—–]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesAnswer(expected: string[], typed: string): boolean {
  const value = norm(typed);
  if (!value) return false;
  return expected.some((item) => norm(item) === value);
}

export function tone(percent: number): string {
  if (percent >= 90) return "Майже без помилок.";
  if (percent >= 70) return "Більшість відповідей точні.";
  if (percent >= 40) return "Є що закріпити.";
  return "Варто повернутися до карток.";
}
