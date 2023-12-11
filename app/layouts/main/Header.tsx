import Logo from "@/app/ui/Logo";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 border-b">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        <Link href="/one">one</Link>
        <Link href="/two">two</Link>
        <Link href="/three">three</Link>
      </nav>
    </header>
  );
}
