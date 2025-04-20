
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { LLMModel } from '@/services/searchService';

const Header: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<LLMModel>('default');

  const handleModelChange = (value: LLMModel) => {
    setSelectedModel(value);
    // Store in localStorage to persist across page reloads
    localStorage.setItem('selectedLLM', value);
    console.log('LLM model changed to:', value);
  };

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
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground">LLM:</span>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Select LLM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                <SelectItem value="llama-3">Llama 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Features</Button>
            <Button variant="ghost" size="sm">Documentation</Button>
            <Button variant="ghost" size="sm">Research</Button>
            <Button variant="outline" size="sm">Login</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
