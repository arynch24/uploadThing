"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, CreditCard, User, Settings } from "lucide-react";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { data: session } = useSession();

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

    // If the user is not logged in, return null (or handle appropriately)
    if (!session?.user) return null;

    const user = {
        name: session.user.name || "User",
        email: session.user.email || "user@example.com",
        image: session.user.image || "https://via.placeholder.com/40",
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Image */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent immediate close
                    setIsOpen((prev) => !prev);
                }}
                className="w-8 h-8 rounded-full overflow-hidden focus:border-1 border-zinc-500"
            >
                <img src={user.image} alt="User Profile" className="w-full h-full" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 w-56 h-44 bg-zinc-800 text-white shadow-lg rounded-md p-1">
                    <div className="px-3 py-2 text-sm ">
                        <p className="font-semibold text-gray-200">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>

                    <hr className="border-black py-0.5" />

                    <ul className="text-gray-200 text-sm flex flex-col gap-1">
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer">
                            <User size={16} /> Profile
                        </li>
                        <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer">
                            <CreditCard size={16} /> Billing
                        </li>
                        <hr className="border-black " />
                        <li
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-900 rounded cursor-pointer"
                            onClick={() => signOut()}
                        >
                            <LogOut size={16} /> Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
