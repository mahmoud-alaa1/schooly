"use client";
import { useState } from "react";

interface ConnectFormProps {
  connectToVideo: (channelName: string) => void;
}

export const ConnectForm = ({ connectToVideo }: ConnectFormProps) => {
  const [channelName, setChannelName] = useState("");
  const [invalidInputMsg, setInvalidInputMsg] = useState("");

  const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
    // trim spaces
    const trimmedChannelName = channelName.trim();

    // validate input: make sure channelName is not empty
    if (trimmedChannelName === "") {
      e.preventDefault(); // keep the page from reloading on form submission
      setInvalidInputMsg("Channel name can't be empty."); // show warning
      setChannelName(""); // resets channel name value in case user entered blank spaces
      return;
    }

    connectToVideo(trimmedChannelName);
  };

  return (
    <form onSubmit={handleConnect}>
      <div className="card">
        <input
          id="channelName"
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => {
            setChannelName(e.target.value);
            setInvalidInputMsg(""); // clear the error message
          }}
        />
        <button>Connect</button>
        {invalidInputMsg && <p style={{ color: "red" }}> {invalidInputMsg} </p>}
      </div>
    </form>
  );
};
