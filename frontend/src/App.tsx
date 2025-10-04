import { useState, useEffect } from "react";
import { socket } from "./socket";
import ChatWindow from "./components/ChatWindow";
import UsernameModal from "./components/UsernameModal";

export interface Message {
  username: string;
  text: string;
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!username) return;

    socket.connect();

    function onNewMessage(newMessage: Message) {
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    }

    socket.on("receive_message", onNewMessage);

    return () => {
      socket.off("receive_message", onNewMessage);
      socket.disconnect();
    };
  }, [username]);

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleSendMessage = (text: string) => {
    const message = {
      username,
      text,
    };

    socket.emit("send_message", JSON.stringify(message));
  };

  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col">
      {!username ? (
        <UsernameModal onSetUsername={handleSetUsername} />
      ) : (
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
      )}
    </main>
  );
}

export default App;
