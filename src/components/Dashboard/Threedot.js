"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Link, Trash2 } from "lucide-react";

const Profile = ({ url, fileId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const fileKey = "No filekey";
    const fileURL = url;

    // Close menu when clicking outside
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

    // Function to copy text to clipboard
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    
    //Deleting file from cloudinary and MongoDB
    const handleDelete = async (fileId) => {
        try {
            const response = await fetch(`/api/delete-file/${fileId}`, {
                method: "DELETE",
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.log("Server Response:", responseData); 
                throw new Error(responseData.error || "Failed to delete file")
            };

            alert("File deleted successfully");
            window.location.reload(); // Refresh UI
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Error deleting file");
        }
    };


    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Three-dot button */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent immediate close
                    setIsOpen((prev) => !prev);
                }}
                className="w-6 h-6 rounded-sm hover:bg-zinc-900"
            >
                ...
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-56 bg-zinc-800 text-white shadow-lg rounded-md p-1 z-50">
                    <ul className="text-gray-200 text-sm flex flex-col gap-1">
                        <li
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer"
                            onClick={() => copyToClipboard(fileKey)}
                        >
                            <Copy size={16} /> Copy File Key
                        </li>
                        <li
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer"
                            onClick={() => copyToClipboard(fileURL)}
                        >
                            <Link size={16} /> Copy File URL
                        </li>
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-red-600 rounded cursor-pointer"
                            onClick={() => handleDelete(fileId)}
                        >
                            <Trash2 size={16} /> Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
