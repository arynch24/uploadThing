"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Upload, Search } from "lucide-react";
import FileButton from "../../../components/Dashboard/FileButton";
import CheckboxButton from "@/components/Dashboard/CheckBox";
import Threedot from "@/components/Dashboard/Threedot";
import { useSession } from "next-auth/react";


const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetch(`/api/get-files?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Fetched files:", data.files);
          setFiles(data.files);
        })
        .catch((err) => console.error("Error fetching files:", err));
    }
  }, [session]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "aryan_cloudinary");
    formData.append("folder", "uploads");
    formData.append("userId", session.user.id);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed. Please try again.");

      const data = await response.json();
      const newFile = data.file;

      console.log(`Files :${files}`);

      setFiles((prevFiles) => [newFile, ...prevFiles]);
    } catch (error) {
      console.error("Upload failed:", error.message);
    }
  };
  return (
    <div className="flex min-h-screen  text-white">
      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center">
          <div><h2 className="break-normal font-medium text-lg sm:text-xl">Files</h2>
            <p className="text-zinc-400 text-sx sm:text-sm">These are all of the files that have been uploaded via your uploader.</p></div>
          <label htmlFor="fileInput" className="cursor-pointer">
            <Button
              size="icon"
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => document.getElementById("fileInput").click()} // Ensure click triggers
            >
              <Upload size={16} />
              Upload
            </Button>
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleUpload}
          />

        </div>
        <div className="py-4 flex gap-2">
          <div className="flex items-center border rounded-md border-zinc-800 ">
            <Search className="relative left-2 text-zinc-500 " size={16} />
            <input
              type="text"
              placeholder="Search"
              className="w-full flex px-5 py-1 text-base shadow-sm transition-colors placeholder:text-zinc-500 h-8 md:text-sm peer focus:outline-none"
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
                      <TableHead className={"w-[60px]"}><button className="text-zinc-500">...</button></TableHead>
                    </TableRow>
                  </TableHeader>

                  { <TableBody className="text-white">
                    {files.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center py-20">
                          <div className="flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-2xl text-zinc-200 sm:text-xl">No files uploaded yet</h1>
                            <p className="text-base text-zinc-500 sm:text-sm">Upload some files to get started!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      files.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell><CheckboxButton /></TableCell>
                          <TableCell className={"text-zinc-400 max-w-0 truncate"}>{file.name}</TableCell>
                          <TableCell  className={"text-zinc-400 max-w-0 truncate"}>/uploads/{file.name}</TableCell>
                          <TableCell  className={"text-zinc-400 max-w-0 truncate"}>{file.size}</TableCell>
                          <TableCell  className={"text-zinc-400 max-w-0 truncate"}>{file.uploaded}</TableCell>
                          <TableCell  className={"text-zinc-400 max-w-0 truncate"}>{file.status}</TableCell>
                          <TableCell className="relative"><Threedot url={file.url} fileId={file._id}/></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody> }
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
