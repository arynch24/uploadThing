import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

const Message = ({ type, msg, onClose, fileKaName }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (msg) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                onClose && onClose();
            }, 300000);
            return () => clearTimeout(timer);
        }
    }, [msg, onClose]);

    if (!visible || !msg) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-5 text-zinc-950 text-sm
          bg-gray-100`}
        >
            <div>
                {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            </div>
            <div>
                <div>{msg}</div>
                {type==="success" ? `${fileKaName} uploaded!`:""}
            </div>
            <button onClick={() => setVisible(false)} className="ml-2 text-white text-lg font-bold">&times;</button>
        </div>
    );
};

export default Message;
