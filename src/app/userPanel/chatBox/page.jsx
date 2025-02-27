"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Config from "@/components/config";
import Link from "next/link";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId] = useState("14"); // Example user ID
  const [file, setFile] = useState(null); // State for the selected file

  // Use useSearchParams to access the URL query parameters
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id"); // Retrieve ticketId from URL query parameters

  useEffect(() => {
    if (ticketId) {
      fetchMessages(); // Fetch messages when ticketId is available
    }
  }, [ticketId]); // Fetch messages whenever ticketId changes

  // Fetch chat history when the component mounts or when ticketId changes
  const fetchMessages = async () => {
    try {
      // Get the bearer token from localStorage
      const token = localStorage.getItem("token"); // Adjust token key as needed
      if (!token) {
        alert("User not authenticated");
        return;
      }

      // Send the request with the token in the Authorization header
      const response = await axios.get(
        `${Config.apiUrl}/user/ticket/chat/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token here
          },
        }
      );

      console.log("Fetched messages:", response.data); // Log the API response to inspect

      if (response.data.code === 1) {
        setMessages(response.data.chats); // Update the messages state with the data from the API
      } else {
        alert("Failed to load messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages");
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() || file) {
      const formData = new FormData();
      formData.append("ticket_id", ticketId);
      formData.append("user_id", userId);
      formData.append("text", newMessage);
      formData.append("type", "user");
      formData.append("time", Date.now());

      // Append the file if it's selected
      if (file) {
        formData.append("image", file);
      }

      // Get the bearer token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      try {
        // Send the message using axios
        const response = await axios.post(
          `${Config.apiUrl}/user/ticket/sendchat/${ticketId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.code === 1) {
          // After the server response, fetch the latest messages
          fetchMessages();
        } else {
          alert("Failed to send message");
        }

        // Clear the input field and file
        setNewMessage("");
        setFile(null); // Clear the selected file
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Something went wrong while sending the message");
      }
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 w-full max-w-2xl mx-auto">
      <Link
        className="border border-gray-300 my-2 w-[80px] p-2 text-center rounded-[5px] bg-gray-100 "
        href="/userPanel/ticket"
      >
        بازگشت
      </Link>
      <div className="flex flex-col h-screen w-full max-w-2xl bg-gray-100">
        {/* Chat history section */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white shadow-lg rounded-t-xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col">
                <div className={`my-4 p-4  max-w-md min-w-[40%]`}>
                  <div
                    className={`flex  space-x-2  ${
                      message.type === "user"
                        ? "flex-row-reverse justify-start"
                        : "justify-start"
                    }`}
                  >
                    <img
                      src={
                        message.avatar
                          ? `${Config.baseUrl}/${message.avatar}`
                          : "/default-avatar.png"
                      } // Handle avatar path
                      alt={message.name}
                      className="w-10 h-10 rounded-full mx-2"
                    />
                    <span className="font-semibold text-xs sm:text-sm ">
                      {message.name}
                    </span>
                  </div>
                  <p
                    className={`mt-2 p-2 rounded-md text-xs sm:text-sm  ${
                      message.type === "user"
                        ? "bg-blue-500 text-white text-left"
                        : "bg-gray-200 text-right"
                    }`}
                  >
                    {message.text}
                  </p>

                  <span className="text-xs text-gray-300">
                    {new Date(message.time * 1000).toLocaleTimeString()}
                  </span>
                </div>

                {message.file && (
                  <div className="p-4 rounded-md max-w-md min-w-[40%] ">
                    <div
                      className={`flex  space-x-2  ${
                        message.type === "user"
                          ? " flex-row-reverse justify-start"
                          : "justify-start"
                      }`}
                    >
                      <img
                        src={
                          message.avatar
                            ? `${Config.baseUrl}/${message.avatar}`
                            : "/default-avatar.png"
                        } // Handle avatar path
                        alt={message.name}
                        className="w-10 h-10 rounded-full mx-2"
                      />
                      <span className="text-center font-semibold text-xs sm:text-sm">
                        {message.name}
                      </span>
                    </div>

                    {message.file && (
                      <div className="mt-2">
                        <img
                          src={`${Config.baseUrl}/${message.file}`} // Adjust path as needed
                          alt="Attached file"
                          className="max-w-full rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    <span className="text-xs text-gray-300">
                      {new Date(message.time * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message input section */}
        <div className="p-3 bg-white border-t border-gray-300 shadow-lg rounded-b-xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-3 text-sm sm:text-lg border border-gray-300 rounded-r-[5px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 h-[50px]"
              placeholder="پیام خود را بگذارید..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* File input */}
            <input
              type="file"
              onChange={handleFileChange}
              className="p-3 text-sm text-gray-500 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
            />
            <button
              onClick={sendMessage}
              className=" bg-blue-500 text-white p-3 px-4 sm:px-6 rounded-l-[5px] hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              ارسال
            </button>
          </div>

          {/* Optionally display the selected file name */}
          {file && (
            <div className="mt-2 text-xs text-gray-500">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chatbox />
    </Suspense>
  );
}
