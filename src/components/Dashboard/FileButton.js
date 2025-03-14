import { Plus } from "lucide-react";
export default function FileButton({ children }) {
    return (
      <button className="inline-flex items-center justify-center font-medium transition-colors border border-dashed border-zinc-800 shadow-sm gap-2 rounded hover:bg-zinc-800/50 disabled:opacity-60 text-xs py-1.5 px-4">
       <Plus size={14}/> {children}
      </button>
    );
  }
  