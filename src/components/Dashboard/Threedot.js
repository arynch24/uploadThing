"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Link, Trash2, MoreHorizontal } from "lucide-react";
import Message from "./Message";

const Threedot = ({ url, fileId, fileKaSize, fileName, onFileDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
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
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 3000);

        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };


    //Deleting file from cloudinary and MongoDB
    const handleDelete = async (fileId) => {
        try {
            setIsOpen(false); // Close the dropdown

            const response = await fetch(`/api/delete-file/${fileId}`, {
                method: "DELETE",
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.log("Server Response:", responseData);
                throw new Error(responseData.error || "Failed to delete file");
            }

            // Call the onFileDelete callback with fileId, fileName, and fileSize
            if (onFileDelete) {
                onFileDelete(fileId, fileName, fileKaSize);
            }

        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Three-dot button */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent immediate close
                    setIsOpen((prev) => !prev);
                }}
                className="w-8 h-8 rounded-sm hover:bg-zinc-900 flex items-center justify-center"
            >
                <MoreHorizontal size={16} />
            </button>

            {/* Dropdown Menu - Fixed positioning */}
            {isOpen && (
                <div className="fixed z-50 bg-zinc-800 text-white shadow-lg rounded-md p-1" style={{
                    right: 'auto',
                    left: menuRef.current ?
                        menuRef.current.getBoundingClientRect().left - 120 : 'auto',
                    top: menuRef.current ?
                        menuRef.current.getBoundingClientRect().bottom + 5 : 'auto'
                }}>
                    <ul className="text-gray-200 text-sm flex flex-col gap-1 w-36">
                        <li
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer"
                            onClick={() => copyToClipboard(fileURL)}
                        >
                            <Link size={16} /> Copy File URL
                        </li>
                        <li className="group flex items-center gap-2 px-2 py-1.5 primary hover:bg-zinc-900 rounded cursor-pointer" onClick={() => handleDelete(fileId)}>
                            <Trash2 size={16} className="group-hover:text-white" />
                            <span className="group-hover:text-white">Delete</span>
                        </li>
                    </ul>
                </div>
            )}

            {copied ?
                <Message type="copied" msg="Copied" /> : null
            }
        </div>
    );
};

export default Threedot;