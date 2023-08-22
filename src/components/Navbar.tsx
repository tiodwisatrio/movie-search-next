"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
    const [input, setInput] = useState("");
    const router = useRouter();
    const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`?movie=${input}`);
        setInput("");
    };
    return (
        <nav className="py-8 px-8">
            <div className="container mx-auto flex justify-between items-center ">
                <Link href="/">
                    <div className="text-[20px] font-medium">MV_Search</div>
                </Link>
                <form action="" onSubmit={searchMovie}>
                    <div className="space-x-4">
                        <input
                            className="bg-[#212529] px-4 py-2 outline-none placeholder:text-textColor rounded"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="search movie..."
                        />
                        <button type="submit" className="bg-accent text-textColor text-sm py-2 px-4 hover:bg-hoverAccent rounded">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
