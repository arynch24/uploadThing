import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import { Button } from "./ui/button";
export default function Footer() {
    return (
        <footer className="align-bottom px-20">
            <div className="w-full h-20 py-8 text-sm flex justify-between items-center border-t-[0.1px] border-zinc-800 px-8">
                <p className="text-gray-400">© 2025 Ping Labs. All rights reserved.</p>
                <div className="text-300 h-7 flex gap-10 text-gray-300">
                    <Button variant="outline">Terms of Service</Button>
                    <Button variant="outline">Support</Button>
                </div>
                <div className="text-gray-400 flex items-center gap-6 h-9 ">
                    <Button variant="ghost" size="icon"><span className="text-3xl text-green-500">•</span>
                        All Systems Operational</Button>
                    <div className="flex gap-6">
                        <a href="https://github.com" target="_blank">
                            <FaGithub className="w-5 h-5  " />
                        </a>
                        <a href="https://discord.com" target="_blank">
                            <FaDiscord className="w-5 h-5 " />
                        </a>
                        <a href="https://twitter.com" target="_blank">
                            <FaTwitter className="w-5 h-5 " />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
