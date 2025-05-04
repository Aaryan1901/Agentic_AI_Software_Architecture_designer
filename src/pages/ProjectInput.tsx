
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowRight, Lightbulb } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import Header from '@/components/Header';
import { toast } from "sonner";

const ProjectInput = () => {
  const navigate = useNavigate();
  const [projectIdea, setProjectIdea] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectIdea.trim()) {
      toast.error("Please enter your project idea");
      return;
    }
    
    // Store the project idea in session storage
    sessionStorage.setItem('projectIdea', projectIdea);
    
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      navigate('/requirements');
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-architect bg-clip-text text-transparent bg-gradient-to-r from-architect-dark to-architect-highlight animate-fade-in">ArchitectAI</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your project ideas into professional software architecture plans ready for hackathons and beyond
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border-architect/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-architect-light/20 to-background">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-architect" />
                Start With Your Project Idea
              </CardTitle>
              <CardDescription>
                Describe your project idea in as much detail as possible. The more specific you are, the better the architecture recommendations will be.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="projectIdea" className="text-sm font-medium mb-1 block">
                      What is your project idea?
                    </label>
                    <Textarea
                      id="projectIdea"
                      placeholder="Describe your software project idea (e.g., 'I want to build a real-time collaborative document editor with AI writing assistance')"
                      className="min-h-[200px] resize-y"
                      value={projectIdea}
                      onChange={(e) => setProjectIdea(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md flex gap-3">
                    <AlertCircle className="h-5 w-5 text-architect flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Tips for better results:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Include the purpose and main features</li>
                        <li>Mention expected user volume and scale</li>
                        <li>Note any specific technical requirements</li>
                        <li>Specify performance or security needs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end border-t bg-muted/20 py-4">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-architect hover:bg-architect-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <>Processing<span className="loading-dots"></span></>
                  ) : (
                    <>Continue to Requirements <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 10h12" /><path d="M4 14h9" /><path d="M4 18h6" /><rect width="8" height="4" x="12" y="6" rx="1" /></svg>}
              title="AI-Powered Analysis"
              description="Our AI analyzes your requirements and leverages open-source LLMs to create tailored architecture plans"
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" /><path d="M7 7 4.5 3h15L17 7" /></svg>}
              title="Dynamic Visualizations"
              description="Receive detailed architecture diagrams including flowcharts, use cases, component diagrams and more"
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></svg>}
              title="Hackathon Ready"
              description="Get complete architecture plans with tech stack, component lists, deployment options, and cost estimates"
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-architect">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <p className="text-sm text-muted-foreground">© 2025 ArchitectAI. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .loading-dots::after {
          content: '...';
          animation: dots 1.5s infinite;
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <div className="flex flex-col items-center text-center p-6 rounded-lg border border-architect/20 hover:border-architect/40 transition-colors bg-gradient-to-b from-background to-muted/20 hover:shadow-md">
    <div className="w-12 h-12 rounded-full bg-architect flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default ProjectInput;
