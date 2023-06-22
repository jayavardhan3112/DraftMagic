// src/pages/MessageComposePage.js
import React, { useState } from "react";
import Button from "../components/Button";

const techRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Researcher",
  "DevOps Engineer",
  "Cloud Architect",
  "Database Administrator",
  "Network Engineer",
  "Security Analyst",
  "UI/UX Designer",
  "Product Manager",
  "Quality Assurance Engineer",
  "Agile Coach",
  "Scrum Master",
  "IT Project Manager",
  "Technical Writer",
  "Technical Support Engineer",
  "Systems Analyst",
  "IT Consultant",
  "Blockchain Developer",
  "Embedded Systems Engineer",
  // Add more tech roles as needed
];

const nonTechRoles = [
  "Recruiter",
  "Human Resources Manager",
  "Talent Acquisition Specialist",
  "HR Business Partner",
  "Training and Development Manager",
  "People Operations Manager",
  "Employee Relations Specialist",
  "Organizational Development Consultant",
  "Project Manager",
  "Business Analyst",
  "Product Owner",
  "Marketing Manager",
  "Digital Marketing Specialist",
  "Sales Manager",
  "Account Manager",
  "Customer Success Manager",
  "Finance Manager",
  "Financial Analyst",
  "Operations Manager",
  "Legal Counsel",
  "Data Analyst",
  "Technical Sales Engineer",
  "IT Procurement Specialist",
  "IT Vendor Manager",
  "Business Development Manager",
  // Add more non-tech roles as needed
];

const MessageComposePage = () => {
  const [designation, setDesignation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("normal");
  const [wordCount, setWordCount] = useState(100);
  const MIN_WORD_COUNT = 10;
  const MAX_WORD_COUNT = 500;
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(draftMessage);
  };
  const handleDraftMessage = async () => {
    setLoading(true);
    // Make an API call to the backend to generate the draft message
    try {
      const response = await fetch("http://localhost:3001/api/draftMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          designation,
          recipient,
          subject,
          body,
          messageType,
        }),
      });

      const data = await response.json();
      setDraftMessage(data.draftMessage);
    } catch (error) {
      console.error("Error generating draft message:", error);
      // Handle the error case
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      <div className="max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Compose Message</h1>

        <div className="mb-4 relative">
          <label
            htmlFor="designation"
            className="font-bold mb-1 flex items-center"
          >
            Your Designation:
            <span className="ml-2 text-sm text-gray-500">
              <span className="text-gray-600">e.g.,</span> Software Engineer,
              Product Manager
            </span>
          </label>
          <select
            id="designation"
            className="border border-gray-300 rounded px-3 py-2 w-full appearance-none focus:outline-none focus:border-blue-500"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Select a designation</option>
            {techRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
            {nonTechRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M9 11l4-4 4 4H9z"></path>
            </svg>
          </div>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="recipient"
            className="font-bold mb-1 flex items-center"
          >
            Recipient:
            <span className="ml-2 text-sm text-gray-500">
              <span className="text-gray-600">e.g.,</span> Product Owner, HR
              Manager
            </span>
          </label>
          <select
            id="recipient"
            className="border border-gray-300 rounded px-3 py-2 w-full appearance-none focus:outline-none focus:border-blue-500"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Select a recipient</option>
            {techRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
            {nonTechRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M9 11l4-4 4 4H9z"></path>
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="font-bold mb-1 flex items-center">
            Subject:
            <span className="ml-2 text-sm text-gray-500">
              <span className="text-gray-600">e.g.,</span> Job Application,
              Meeting Request
            </span>
          </label>

          <input
            type="text"
            id="subject"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="font-bold mb-1 flex items-center">
            Body:
            <span className="ml-2 text-sm text-gray-500">
              <span className="text-gray-600">e.g.,</span> Include main message,
              details, formatting
            </span>
          </label>
          <textarea
            id="body"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="font-bold mb-1">Message Type:</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="message-type-normal"
              value="normal"
              checked={messageType === "normal"}
              onChange={() => setMessageType("normal")}
              className="mr-2"
            />
            <label htmlFor="message-type-normal" className="mr-4">
              Normal Message
            </label>
            <input
              type="radio"
              id="message-type-email"
              value="email"
              checked={messageType === "email"}
              onChange={() => setMessageType("email")}
              className="mr-2"
            />
            <label htmlFor="message-type-email">Email</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="wordCount" className="font-bold mb-1">
            Desired Word Count:
          </label>
          <input
            type="number"
            id="wordCount"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={wordCount}
            onChange={(e) => {
              const enteredValue = parseInt(e.target.value);
              const adjustedValue = Math.min(enteredValue, MAX_WORD_COUNT);
              setWordCount(adjustedValue);
            }}
            min={MIN_WORD_COUNT}
            max={MAX_WORD_COUNT}
          />
        </div>

        <Button
          onClick={handleDraftMessage}
          disabled={!designation || !recipient || !subject || !body}
        >
          Generate Draft
        </Button>

        {(!designation || !recipient || !subject || !body) && (
          <p className="text-red-500 mt-2">Please fill in all the fields.</p>
        )}

        {loading && (
          <div className="text-center mt-4">
            <p className="text-gray-500 mb-2">
              Generating a draft with AI magic...
            </p>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-gray-500 mt-2">
              Please wait, we're teaching our AI brain to write!
            </p>
          </div>
        )}

        {!loading && draftMessage && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Generated Draft:</h2>
            <div className="border border-gray-300 rounded p-4 flex items-center">
              <p className="text-gray-800 flex-grow">{draftMessage}</p>
              <button
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCopyToClipboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-copy h-4 w-4"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15h2a2 2 0 0 0 2-2V5h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageComposePage;
