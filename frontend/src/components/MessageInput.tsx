import { useState } from "react";

interface Props {
  onSendMessage: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText(""); // Clear input after sending
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 border-t border-gray-700"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded-l-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r-md font-bold"
        >
          Send
        </button>
      </div>
    </form>
  );
}
