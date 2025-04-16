
import React from 'react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-architect">
            <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
            <path d="M7 7 4.5 3h15L17 7" />
            <path d="m12 16-1 6h2l1-6" />
          </svg>
          <h1 className="text-lg font-bold">ArchitectAI</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Features</Button>
          <Button variant="ghost" size="sm">Documentation</Button>
          <Button variant="ghost" size="sm">About</Button>
          <Button variant="outline" size="sm">Login</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
