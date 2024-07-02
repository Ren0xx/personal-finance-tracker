export default function getCssVar(name: string) {
  return `hsla(${getComputedStyle(document.documentElement).getPropertyValue(name)})`;
}
