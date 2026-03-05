import forbiddenWords from '@/static/forbiddenWords';
import { Message } from '@pubnub/chat';

/**
 * Formats a PubNub timetoken into a human-readable string.
 *
 * Examples:
 * - Today at 14:30
 * - Jul 30 at 14:30
 * - Dec 25, 2024 at 09:00
 *
 * @param timetoken - The PubNub timetoken.
 * @returns A formatted date string.
 */
export function formatTimetokenPretty(timetoken: string | number): string {
  const date = new Date(Number(timetoken) / 10_000);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isSameYear = date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  if (isToday) {
    return `Today at ${time}`;
  }

  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(isSameYear ? {} : { year: 'numeric' })
  });

  return `${datePart} at ${time}`;
}

/**
 * Returns the most recent message value from history if message was updated, prioritizing updated values
 * by the highest `actionTimetoken`.
 *
 * @param message - A message object potentially containing `actions.updated`
 * @returns The updated message value or the original `message.text`
 */
export function getMessageValue (message: Message): string  {
  let messageText = message.text
  if (message.actions?.updated) {
    let messageValue = null;
    let maxTimetoken = 0;

    for (const [key, value] of Object.entries(message.actions.updated)) {
      const currentTimetoken = value[0].actionTimetoken as number;
      if (currentTimetoken > maxTimetoken) {
        maxTimetoken = currentTimetoken;
        messageValue = key;
      }
    }

    messageText =  messageValue && messageValue.length > 0 ? messageValue : '';
  }
  return messageText;
}

/**
 * Detects whether a given string contains RTL (Right-To-Left) characters.
 *
 * @param text - Input text
 * @returns True if the text contains RTL characters, otherwise false
 */
export function isRtl(text: string): boolean {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
}

/**
 * Replaces forbidden words in the input string with asterisks (`***`).
 *
 * Uses case-insensitive whole-word matching.
 *
 * @param input - Raw message string
 * @returns Sanitized message with censored forbidden words
 */
export function sanitizeMessage (input: string): string {
  let sanitized = input;

  forbiddenWords.forEach((word) => {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
    sanitized = sanitized.replace(pattern, '***');
  });

  return sanitized;
}

/**
 * Validates input text size. If text size exceeds threshold it will return false..
 * Otherwise - true
 *
 * @returns Escaped string
 * @param text - input text
 * @param bytesThreshold - size threshold in bytes
 */
export function isValidTextSize(text: string, bytesThreshold: number): boolean {
  const byteSize = (str: string) => new Blob([str]).size;
  const textSize = byteSize(text);

  if(textSize <= 0) {
    return true;
  }

  return textSize <= bytesThreshold;
}

/**
 * Escapes RegExp special characters in a string for safe use in `new RegExp()`.
 *
 * @param string - Raw string
 * @returns Escaped string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isHtmlMessage(value: string) : boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}
