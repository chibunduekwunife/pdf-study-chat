import Image from "next/image";
import ModeToggle from "@/app/components/ModeToggle";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import React from "react";

export default function Header({ activeMode, setActiveMode }:
{
    activeMode: string,
    setActiveMode: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <header className='absolute flex justify-between items-center p-2.5 w-full
          bg-gradient-to-b from-blue-950 to-[#040d17]'>
            {/*logo*/}
            <div className="flex items-center md:flex gap-3">
                <Image
                    src="/logo2.png"
                    alt="Study Sage logo"
                    width="50"
                    height="25"
                    className="rounded-lg cursor-pointer"
                />
                <h1 className='hidden md:block text-white text-3xl font-bold'>
                    Study
                    <span className='text-blue-300'>Sage</span>
                </h1>
                <ModeToggle
                    activeMode={activeMode}
                    setActiveMode={setActiveMode}
                />
            </div>

            {/*clerk sign in/sign up buttons*/}
            <div className="flex space-x-4 justify-center items-center">
                <SignedIn>
                    <UserButton appearance={{baseTheme: dark}} afterSignOutUrl="/"/>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button
                            className="text-blue-300 border border-blue-500 hover:text-white hover:bg-[#2d06ff4a] py-2 px-4 rounded-3xl transition duration-300 ease-in-out">Sign
                            in
                        </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button
                            className="bg-gray-200 py-2 px-4 rounded-3xl transition duration-300 ease-in-out">Sign
                            up
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </header>
    )
}
