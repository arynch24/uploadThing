import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Trash2 } from "lucide-react";

const Message = ({ type, msg, onClose, fileKaName, fileKaSize }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (msg) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    onClose && onClose();
                }, 500);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [msg, onClose]);

    return (
        <AnimatePresence>
            {visible && msg && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-5 text-zinc-950 text-sm bg-gray-100"
                >
                    <div>
                        {type === "success" ? (
                            <CheckCircle size={18} />
                        ) : type === "delete" ? (
                            <Trash2 size={18} />
                        ) : type === "failure" ? (
                            <AlertCircle size={18} />
                        ) : (
                            <AlertCircle size={18} />
                        )}
                    </div>
                    <div>
                        <div className="font-bold">{msg}</div>
                        {type === "success"
                            ? `${fileKaName} uploaded!`
                            : type === "failure"
                                ? "File upload failed. Please try again."
                                : type === "delete"
                                    ? `Queued job to delete 1 file for a total of ${fileKaSize}`
                                    : ""}
                    </div>
                    <button onClick={() => setVisible(false)} className="ml-2 text-white text-lg font-bold">
                        &times;
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Message;
