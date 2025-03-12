import CodeSnippet from "../Home/CodeSnippet";
import Image from "next/image";
import TestimonialCard from "./TestimonialCard";
export default function Section() {
    const exampleCode1 = `
    export const fileRouter = {
        imageUploader: f({ image: { maxFileSize: "4MB" } })
          .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);
       
            // Throw to block uploading
            if (!user)
              throw new UploadThingError("Unauthorized");
       
            // Return metadata to client
            return { userId: user.id };
          })
          .onUploadComplete(async ({ metadata, file }) => {
            // ...
          }),
      } satisfies FileRouter;
    `;

    const exampleCode2 = `
    <UploadButton
        endpoint="imageUploader" // Typesafe btw
        onClientUploadComplete={(response) => ...}
        onUploadError={(error) => ...}
    />
    `;

    return (
        <div className="relative bg-white text-black flex flex-col items-center justify-center py-20">


            <div className="flex flex-col items-center">
                <p className="primary mono-text text-center">Your Auth. Our Bandwidth</p>
                <h1 className="text-5xl font-bold text-black text-center mt-2">
                    The right balance of security and simplicity.
                </h1>
                <p className="text-lg text-gray-500 text-center p-5">
                    Authentication happens on your server, the upload happens on ours.
                </p>
                <Image
                    src="/icons.png"
                    alt="section image"
                    width={576}
                    height={32}
                    className=""
                />
            </div>

            {/* Code Snippet */}
            <div className="flex justify-between w-3/4 pt-20">
                <CodeSnippet code={exampleCode1} title="server.ts" language="typescript" />
                <div className="h-44 w-[27rem]">
                    <CodeSnippet code={exampleCode2} title="client.tsx" language="tsx" />
                </div>
            </div>

            <div className="py-32 w-full flex items-center justify-center">
                <TestimonialCard />
            </div>

            <div>
                <h1 className="text-5xl font-bold text-black text-center mt-2">
                    Easily manage your files.
                </h1>
                <p className="text-lg text-gray-500 text-center p-5">
                    A powerful, intuitive dashboard for developers to securely manage and track all <br />uploaded files.
                </p>
                <Image
                    src="/dashboard.png"
                    alt="section image"
                    width={820}
                    height={372}
                    className="rounded-lg shadow-lg drop-shadow-xl pt-20"
                    style={{
                        filter: "drop-shadow(0px 0px 18px rgba(255, 99, 99, 0.4))",
                    }}
                />
            </div>
        </div>
    );
}
