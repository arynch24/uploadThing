"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Upload, Search } from "lucide-react";
import FileButton from "../../../components/Dashboard/FileButton";
import CheckboxButton from "@/components/Dashboard/CheckBox";
import Threedot from "@/components/Dashboard/Threedot";
import { useSession } from "next-auth/react";
import Message from "@/components/Dashboard/Message";
import { MoreHorizontal } from "lucide-react";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [fileName, setFileName]=useState("File");
  
  // Add notification state with additional properties
  const [notification, setNotification] = useState(null);

  const fetchFiles = async () => {
    if (session?.user) {
      try {
        const res = await fetch(`/api/get-files?userId=${session.user.id}`);
        const data = await res.json();
        console.log("Full API Response:", data);
        console.log("Fetched files:", data.files);
        setFiles(data.files || []);
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
    console.log("Session data:", session);
  }, [session]);

  // Helper function to show notifications with additional metadata
  const showNotification = (message, type, fileName = null, fileSize = null) => {
    setNotification({ message, type, fileName, fileSize });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handler for when a file is deleted
  const handleFileDelete = (deletedFileId, fileName, fileSize) => {
    // Update the files state by filtering out the deleted file
    setFiles(prevFiles => prevFiles.filter(file => file._id !== deletedFileId));
    
    // Show delete notification with file name and size
    showNotification("File deleted successfully", "delete", fileName, fileSize);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "aryan_cloudinary");
    formData.append("folder", "uploads");
    formData.append("userId", session.user.id);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Connection": "keep-alive",  // Helps maintain HTTP/1.1 connection
          "Accept": "application/json",
        },
      });

      if (!response.ok) throw new Error("Upload failed. Please try again.");

      const data = await response.json();
      const newFile = data.file;

      console.log(`Files :${files}`);

      setFiles((prevFiles) => [newFile, ...prevFiles]);
      setStatus("success");

    } catch (error) {
      console.error("Upload failed:", error.message);
      setStatus("failure");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "") {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);


  const filteredFiles = (files || []).filter((file) =>
    file.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white">
      {/* Global Notification Area */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <Message 
            msg={notification.message} 
            type={notification.type}
            fileKaName={notification.fileName || ""}
            fileKaSize={notification.fileSize || ""}
          />
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center">
          <div><h2 className="break-normal font-medium text-lg sm:text-xl">Files</h2>
            <p className="text-zinc-400 text-sx sm:text-sm">These are all of the files that have been uploaded via your uploader.</p>
          </div>
          <div className="flex items-center">
            <Button
              size="icon"
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => document.getElementById("fileInput").click()}
              disabled={loading}
            >
              <Upload size={16} />
              <span>{loading ? "Uploading..." : "Upload"}</span>
            </Button>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleUpload}
            />

            {status === "success" ? (
              <Message fileKaName={fileName} type="success" msg="File uploaded successfully!" />
            ) : status === "failure" ? (
              <Message fileKaName={fileName} type="failure" msg="Upload failed. Please try again." />
            ) : null}

          </div>
        </div>
        <div className="py-4 flex gap-2">
          <div className="flex items-center border rounded-md border-zinc-800 ">
            <Search className="relative left-2 text-zinc-500 " size={16} />
            <input
              type="text"
              placeholder="Search"
              className="w-full flex px-5 py-1 text-base shadow-sm transition-colors placeholder:text-zinc-500 h-8 md:text-sm peer focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}//update search term
            />
          </div>
          <FileButton>Status</FileButton>
          <FileButton>Route</FileButton>
        </div>

        {/* Table */}
        <div className="rounded-md border border-zinc-800 overflow-hidden">

          <div className="min-h-96 overflow-y-auto">
            <div className="overflow-x-auto whitespace-nowrap">
              <div className="inline-block min-w-full align-middle">
                <Table className="min-w-full text-left text-sm text-zinc-950">
                  <TableHeader className="sticky top-0z-10">
                    <TableRow className="hover:bg-transparent w-full">
                      <TableHead className={"w-[50px]"}><CheckboxButton /></TableHead>
                      <TableHead className={"w-[36%]"}><button className="hover:underline">Name</button></TableHead>
                      <TableHead className={"w-1/7"}><button>Route</button></TableHead>
                      <TableHead className={"w-1/10"}><button className="hover:underline">Size</button></TableHead>
                      <TableHead className={"w-2/10"}><button className="hover:underline">Uploaded</button></TableHead>
                      <TableHead className={"w-1/10"}><button >Status</button></TableHead>
                      <TableHead className={"w-[60px]"}><button className="text-zinc-500 w-8 h-8 rounded-sm hover:bg-zinc-900 flex items-center justify-center"><MoreHorizontal size={16}/></button></TableHead>
                    </TableRow>
                  </TableHeader>

                  {<TableBody className="text-white">
                    {filteredFiles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center py-20">
                          <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-2xl text-zinc-200 sm:text-xl">No files uploaded yet</h1>
                            <p className="text-base text-zinc-500 sm:text-sm">Upload some files to get started!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFiles.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell><CheckboxButton /></TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>{file.name}</TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>/uploads/{file.name}</TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>{file.size}</TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>{file.uploaded}</TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>{file.status}</TableCell>
                          <TableCell className="relative">
                            <Threedot 
                              url={file.url} 
                              fileId={file._id} 
                              fileKaSize={file.size}
                              fileName={file.name}
                              onFileDelete={handleFileDelete} 
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>}
                </Table>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FileUploader;