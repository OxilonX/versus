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
        <Image
          src="/icons/signature.png"
          alt="badge image"
          width={400}
          height={400}
          className=""
        />
        <p className="text-[8px] text-center text-foreground font-bold -mt-7">
          <span className="text-primary ">{"founder "}</span>B. Abderrahmane
        </p>
      </div>
    </div>
  );
};

export default Signature;
