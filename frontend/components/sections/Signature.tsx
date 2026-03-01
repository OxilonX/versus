import { signatureInfo } from "@/utils/SignatureVars";
import Image from "next/image";
const Signature = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center">
        <span className="h-0.5 bg-muted w-full rounded-full"></span>{" "}
        <Image
          src="/images/badge.png"
          alt="badge image"
          width={100}
          height={100}
          className=""
        />
        <span className="h-0.5 bg-muted w-full rounded-full"></span>
      </div>
      <div className="flex flex-col gap-8 items-center text-center ">
        <h1 className="text-6xl leading-22 font-black w-[70%] ">
          {signatureInfo.title}
        </h1>
        <p className="text-xl leading-9 font-medium text-foreground/70 w-[60%] ">
          {signatureInfo.description}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <img src="" alt="signature" />
        <p className="text-xs text-foreground font-bold">
          Boulmehad <span className="text-primary">founder</span>
        </p>
      </div>
    </div>
  );
};

export default Signature;
