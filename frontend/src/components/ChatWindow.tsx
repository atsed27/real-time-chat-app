import type { Message } from "../App";
import MessageInput from "./MessageInput";

interface Props {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ messages, onSendMessage }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="p-2 rounded-lg bg-gray-800">
              <span className="font-bold text-blue-400">{msg.username}: </span>
              <span>{msg.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
