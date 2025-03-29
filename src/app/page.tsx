// "use client";

import Chat from "./components/chat";

// import { useState } from "react";

// export default function Home() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!question) return;

//     setLoading(true);
//     setAnswer("");

//     const response = await fetch("/api/ask", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question }),
//     });

//     const data = await response.json();
//     setAnswer(data.answer || "No response available.");
//     setLoading(false);
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-3xl font-bold mb-4">AI-Powered FAQ</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-md">
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           placeholder="Ask a question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="w-full mt-2 p-2 bg-blue-600 text-white rounded"
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Ask"}
//         </button>
//         {answer && (
//         <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-md">
//           <strong>Answer:</strong> {answer}
//         </div>
//       )}
//       </form>
//     </div>
//   );
// }


export default function Home() {
  return  <Chat/>;
}
