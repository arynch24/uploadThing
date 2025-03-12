import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialCard() {
  return (
    <div className="bg-[#FECDD3] h-[20rem] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-40 w-3/4  shadow-lg">
      {/* Image & Quote Icon */}
      <div className="relative">
        <Image
          src="/photo.webp" 
          alt="Theo"
          width={256}
          height={256}
          className="rounded-[50%] h-[256px] object-cover"
        />
        <div className="absolute bottom-0 right-0 p-6 bg-red-500 text-white rounded-full border-2">
          <FaQuoteLeft className="text-4xl" />
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="flex-1">
        <p className="text-xl md:text-2xl font-medium text-black">
          I asked for a better S3 for years. UploadThing <br></br> exists because we got
          tired of waiting.
        </p>
        <p className="mt-3 text-gray-700 font-medium mono-text pt-6">Theo (t3dotgg)</p>
        <p className="primary font-medium mono-text">
          YouTuber, Creator of T3 Stack, CEO @ UploadThing
        </p>
      </div>
    </div>
  );
}