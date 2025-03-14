"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Link, Trash2 } from "lucide-react";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Ref for dropdown
    const fileKey = "filekey";
    const fileURL = "fileURL";

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Three-dot button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-6 h-6 rounded-sm hover:bg-zinc-900"
            >
                ...
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-56 bg-zinc-800 text-white shadow-lg rounded-md p-1 z-50">
                    <ul className="text-gray-200 text-sm flex flex-col gap-1">
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer">
                            <Copy size={16} onClick={() => (navigator.clipboard.writeText(fileKey))} /> Copy File Key
                        </li>
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer">
                            <Link size={16} onClick={() => (navigator.clipboard.writeText(fileURL))} /> Copy File URL
                        </li>
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-red-600 rounded cursor-pointer">
                            <Trash2 size={16} /> Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
