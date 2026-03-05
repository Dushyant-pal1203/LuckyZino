import winston from "winston";
import path from "path";
import fs from "fs";

// for local testing and development
const logDir = process.env.LOG_DIR ? path.resolve(process.env.LOG_DIR) : path.resolve("./logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

// Specified only console transport because datadog reads directly from stdout
const transports: winston.transport[] = [
  new winston.transports.Console(),
];

// for local testing and development
if (process.env.LOG_TO_FILE !== "false") {
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    })
  );
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info', // info, warn, error by default
  format: winston.format.json(),
  transports,
});

// Helper function. Create logger with already added user id attribute
export function withUser(userId: string) {
  const meta: Record<string, any> = {};
  if (userId) meta["usr.id"] = userId;
  return logger.child(meta);
}
