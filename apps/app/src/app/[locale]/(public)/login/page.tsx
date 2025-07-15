import { GoogleSignin } from "@/components/google-signin";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center justify-center size-96 space-y-8">
        <Image src="/logo.png" alt="logo" width={350} height={350} />
        <GoogleSignin />
      </div>
    </div>
  );
}
