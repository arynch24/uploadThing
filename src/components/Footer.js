import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="align-bottom">
            <div className="w-full h-24 px-[104px] py-8 text-[16px] flex justify-between items-center border-t-[0.5px] border-red-900">
                <p className="text-gray-400">© 2025 Ping Labs. All rights reserved.</p>
                <div className="text-300 h-7 flex gap-10 text-gray-300">
                    <p>Terms of Service</p>
                    <p>Support</p>
                </div>
                <div className="text-gray-400 flex gap-8 h-9 ">
                    <div>All Systems Operational</div>
                    <div className="flex gap-10">
                        <a href="https://github.com" target="_blank">
                            <FaGithub className="w-5 h-5  hover:text-black" />
                        </a>
                        <a href="https://discord.com" target="_blank">
                            <FaDiscord className="w-5 h-5 hover:text-blue-500" />
                        </a>
                        <a href="https://twitter.com" target="_blank">
                            <FaTwitter className="w-5 h-5 hover:text-blue-400" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
