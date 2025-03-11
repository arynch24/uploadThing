import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header>
            <div className="h-2 bg-[#E91616]"></div>
            <div className="w-full h-24 px-24 py-8  flex justify-between items-center">
                <div className="text-3xl font-bold flex items-center justify-center">
                    <div className="text-white">upload</div>
                    <div className="text-[#E91616]">thing</div>
                    <div className=" flex items-center justify-center border-1 text-[9px] font-light px-0.5 py-1 rounded h-4 w-9 text-gray-400">BETA</div>
                </div>
                <Button>Sign In</Button>
            </div>
        </header>
    );
}
