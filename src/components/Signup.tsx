import Cover from "@/assets/winter.jpeg";
import { SignupForm } from "./auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={Cover}
          alt="Vue sur une chambre cosy avec un chat et des livres"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
        />
      </div>
    </div>
  )
}