import { RefreshCw } from 'lucide-react';;
import { isHtmlMessage, isRtl } from '@/components/vip-chat/helper';
import { ChatMessageProps } from '@/types/support';
import { LinkifiedText } from '@/components/vip-chat/common/linkified-text';

import styles from '../vip-chat.module.scss';

/**
 * ChatMessage component
 *
 * Renders an individual chat message bubble with:
 * - Different styles for own vs others' messages
 * - Special styling for greeting messages
 * - Link detection and clickable links using Linkify
 * - Delivery status indicator and resend button for undelivered own messages
 * - Supports RTL (Right-To-Left) characters
 *
 * @param {string} text - The message text to display
 * @param {string} time - The formatted time string to display
 * @param {boolean} isMine - Whether the message was sent by the current user
 * @param {boolean} isGreeting - Whether this message is a greeting (special style)
 * @param {boolean} delivered - Whether the message was successfully delivered
 * @param {() => void} onResend - Callback to trigger resend action on undelivered message
 */
export function ChatMessage({
                              text,
                              time,
                              isMine,
                              isGreeting,
                              delivered = true,
                              onResend,
                            }: ChatMessageProps) {
  // Render greeting message with special styling
  if (isGreeting) {
    return (
      <div className={`w-full p-[2px] rounded-[var(--main-border-radius)] inline-block ${styles.gradient2}`}>
        <div
          className="flex flex-col w-full gap-1 px-3 py-2 rounded-[var(--main-border-radius)] bg-[var(--second-color)]"
        >
          <div className="text-sm font-thin whitespace-pre-line break-words hyphens-auto">{text}</div>
          <div className="flex justify-end">
            <span className="text-xs text-[var(--second-text-color)] font-light">{time}</span>
          </div>
        </div>
      </div>
    );
  }

  // Base style for message bubble container
  const base =
    'flex flex-col items-end w-fit max-w-[80%] gap-2 px-3 py-1 text-sm';
  const timeClass = 'text-xs text-[var(--second-text-color)] font-light';

  // Bubble background and border radius depending on message ownership and delivery
  const bubble = !delivered
    ? 'bg-[var(--error-color)] rounded-tl-[var(--main-border-radius)] rounded-tr-[var(--main-border-radius)] rounded-bl-[var(--main-border-radius)]'
    : isMine
      ? 'bg-[var(--main-color)] rounded-tl-[var(--main-border-radius)] rounded-tr-[var(--main-border-radius)] rounded-bl-[var(--main-border-radius)]'
      : 'bg-[var(--second-color-light)] rounded-tl-[var(--main-border-radius)] rounded-tr-[var(--main-border-radius)] rounded-br-[var(--main-border-radius)]';

  // Main message content including text and timestamp/delivery status
  const messageContent = (
    <div className={`${base} ${bubble}`} dir={isRtl(text) ? 'rtl' : 'ltr'}>
      <div
        className={`w-full whitespace-pre-line break-words hyphens-auto overflow-hidden ${isRtl(text) ? 'text-right' : 'text-left'}`}
      >
        {isHtmlMessage(text) ? (
          <div
            className="
            list-disc list-inside space-y-1
            [&_a]:text-[#3B82F6]
            [&_a]:underline
            [&_a:hover]:text-[#2563eb]
            "
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ) : (
          <LinkifiedText>
            {text}
          </LinkifiedText>
        )}
      </div>
      <div className={timeClass}>
        {delivered ? time : 'Not delivered'}
      </div>
    </div>
  );

  // If this is user's own message and it's undelivered,
  // show resend button next to the message bubble
  if (isMine && !delivered) {
    return (
      <div className="flex justify-end items-center gap-2">
        <button onClick={onResend}>
          <RefreshCw size={16} className="text-[var(--error-color-lighter)] mt-[2px]" />
        </button>
        {messageContent}
      </div>
    );
  }

  // For all other cases (delivered messages or other's messages)
  return (
    <div className={isMine ? 'flex justify-end' : 'flex flex-col'}>
      {messageContent}
    </div>
  );
}