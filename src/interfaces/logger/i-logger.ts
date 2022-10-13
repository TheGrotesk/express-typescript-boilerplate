export default interface ILogger {
  info(str: string): void;
  log(obj: Record<string, unknown>): void;
}