/**
 * NewMessagesDivider component
 *
 * This component renders a visual divider with the label "New messages"
 * to separate newly received chat messages from older ones in the message list.
 *
 */
export default function NewMessagesDivider() {
  return (
    <div className="mx-auto bg-[var(--new-messages-badge-color)] text-[var(--second-color)] font-bold rounded-[var(--main-border-radius)] w-fit py-1 px-2 text-sm my-2">
      New messages
    </div>
  );
};