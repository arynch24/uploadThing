"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"; 


export default function CodeSnippet({ code, language = "javascript", title }) {
  return (
    <div className="bg-[#282a36] rounded-lg shadow-lg w-full max-w-lg">
      {/* MacOS-style title bar */}
      <div className=" flex items-center justify-between px-4 py-2 bg-[#1e1f29] rounded-t-lg">
        <div className="flex gap-2 ">
          <span className="w-3 h-3 bg-red-500 rounded-full "></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
        <div></div>
      </div>

      {/* Code Block */}
      <SyntaxHighlighter
        language={language}
        style={dracula}
        className="rounded-b-lg text-sm h-auto"
        customStyle={{
          padding: "16px",
          margin: 0,
          background: "transparent",
          overflowX: "auto",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
