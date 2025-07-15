import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
      <SignIn 
        fallbackRedirectUrl="/dashboard"
        appearance={{
          baseTheme: dark,
          elements: {
            card: 'bg-zinc-900 border-zinc-800 text-white',
            formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
            headerTitle: 'text-white',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton: 'bg-zinc-800 text-white',
            dividerText: 'text-zinc-400',
            footerActionText: 'text-zinc-400',
            footerActionLink: 'text-violet-400 hover:text-violet-300',
          },
        }}
      />
    </div>
  );
}