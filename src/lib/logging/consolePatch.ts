import { logger } from "./logger";

console.log = (...args: any[]) => {
  logger.info(args.map(a => (typeof a === "object" ? JSON.stringify(a) : a)).join(" "));
};
console.warn = (...args: any[]) => {
  logger.warn(args.map(a => (typeof a === "object" ? JSON.stringify(a) : a)).join(" "));
};
console.error = (...args: any[]) => {
  logger.error(args.map(a => (typeof a === "object" ? JSON.stringify(a) : a)).join(" "));
};
console.debug = (...args: any[]) => {
  logger.debug(args.map(a => (typeof a === "object" ? JSON.stringify(a) : a)).join(" "));
};
