import { Channel, Message, User } from '@pubnub/chat';
import PubNub from 'pubnub';

export interface ChatHeaderProps {
  onClose: () => void;
  vipChatInfo: VipChatDto;
}

export type ChatInputProps = {
  pubnub: PubNub;
  channel: Channel;
  user: User;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export type ChatMessageListProps = {
  pubnub: PubNub;
  vipChatInfo: VipChatDto,
  channel: Channel;
  user: User;
  messages: ExtendedMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ExtendedMessage[]>>;
};

export type ChatMessageProps = {
  text: string;
  time: string;
  isMine?: boolean;
  isGreeting?: boolean;
  delivered?: boolean;
  onResend?: () => void;
};

export type VipChatInitFallbackProps = {
  onCloseChat: () => void;
};

export type VipChatManagerAvatarProps = {
  online: boolean;
};

export type VipChatStatusBadgeProps = {
  text?: string;
};

export type ExtendedMessage = Message & {
  delivered?: boolean;
  local?: boolean;
};

export interface VipChatDto {
  available: boolean;
  online: boolean,
  textStatus: string,
}

export type VipChatEventState = {
  unreadMessageCount: number;
  isActive: boolean;
}
