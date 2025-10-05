import { useState } from "react";

interface Props {
  onSetUsername: (username: string) => void;
}

export default function UsernameModal({ onSetUsername }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSetUsername(name.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Your Username</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., danilap"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
}
