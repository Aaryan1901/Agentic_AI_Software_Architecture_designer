
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Database, Server, Globe, Shield, Zap } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectRequirements } from '@/components/RequirementsForm';

const RequirementsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get project idea from session storage
  const projectIdea = sessionStorage.getItem('projectIdea') || '';

  // Form state
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    projectName: "My Project",
    projectType: "web",
    scale: "medium",
    budget: "medium",
    timeConstraints: "medium",
    description: projectIdea,
    security: "standard",
    features: [],
    customRequirements: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequirements(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setRequirements(prev => ({ ...prev, [name]: value }));
  };

  // Handle feature checkboxes
  const handleFeatureToggle = (feature: string) => {
    setRequirements(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requirements.projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    
    // Store requirements in session storage
    sessionStorage.setItem('projectRequirements', JSON.stringify(requirements));
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/results');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-architect">Project Requirements</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Let's gather detailed information about your project needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-architect/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-architect-light/20 to-background">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Define Your Requirements</CardTitle>
                  <CardDescription>
                    The more details you provide, the more accurate our architecture recommendation will be
                  </CardDescription>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">Project Idea:</p>
                  <p className="text-xs text-muted-foreground max-w-[250px] truncate">{projectIdea}</p>
                </div>
              </div>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Globe className="h-5 w-5 text-architect" />
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="projectName" className="text-sm font-medium">
                          Project Name
                        </label>
                        <Input
                          id="projectName"
                          name="projectName"
                          value={requirements.projectName}
                          onChange={handleInputChange}
                          placeholder="Enter project name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-medium">
                          Project Type
                        </label>
                        <Select 
                          value={requirements.projectType} 
                          onValueChange={(value) => handleSelectChange('projectType', value)}
                        >
                          <SelectTrigger id="projectType">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">Web Application</SelectItem>
                            <SelectItem value="mobile">Mobile Application</SelectItem>
                            <SelectItem value="desktop">Desktop Application</SelectItem>
                            <SelectItem value="api">API Service</SelectItem>
                            <SelectItem value="ai">AI/ML Project</SelectItem>
                            <SelectItem value="iot">IoT System</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="text-sm font-medium">
                        Project Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={requirements.description}
                        onChange={handleInputChange}
                        placeholder="Describe your project in detail"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  {/* Scale & Resources */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Server className="h-5 w-5 text-architect" />
                      Scale & Resources
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="scale" className="text-sm font-medium">
                          Expected Scale
                        </label>
                        <Select 
                          value={requirements.scale} 
                          onValueChange={(value) => handleSelectChange('scale', value)}
                        >
                          <SelectTrigger id="scale">
                            <SelectValue placeholder="Select scale" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (Hundreds of users)</SelectItem>
                            <SelectItem value="medium">Medium (Thousands of users)</SelectItem>
                            <SelectItem value="large">Large (Millions of users)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium">
                          Budget Constraints
                        </label>
                        <Select 
                          value={requirements.budget} 
                          onValueChange={(value) => handleSelectChange('budget', value)}
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (Minimal cost)</SelectItem>
                            <SelectItem value="medium">Medium (Moderate investment)</SelectItem>
                            <SelectItem value="high">High (Enterprise level)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="timeConstraints" className="text-sm font-medium">
                          Time Constraints
                        </label>
                        <Select 
                          value={requirements.timeConstraints} 
                          onValueChange={(value) => handleSelectChange('timeConstraints', value)}
                        >
                          <SelectTrigger id="timeConstraints">
                            <SelectValue placeholder="Select time constraints" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (No rush)</SelectItem>
                            <SelectItem value="medium">Medium (Standard timeline)</SelectItem>
                            <SelectItem value="high">High (Urgent/Hackathon)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Data & Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Database className="h-5 w-5 text-architect" />
                      Data & Security
                    </h3>
                    
                    <div className="space-y-2">
                      <label htmlFor="security" className="text-sm font-medium">
                        Security Requirements
                      </label>
                      <Select 
                        value={requirements.security} 
                        onValueChange={(value) => handleSelectChange('security', value)}
                      >
                        <SelectTrigger id="security">
                          <SelectValue placeholder="Select security level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (Authentication only)</SelectItem>
                          <SelectItem value="standard">Standard (Auth + Encryption)</SelectItem>
                          <SelectItem value="high">High (Enterprise-grade security)</SelectItem>
                          <SelectItem value="compliance">Compliance-focused (HIPAA, GDPR, etc.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Zap className="h-5 w-5 text-architect" />
                      Key Features
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {FEATURES.map((feature) => (
                        <div key={feature.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={feature.id} 
                            checked={requirements.features.includes(feature.id)}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={feature.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {feature.label}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Custom Requirements */}
                  <div className="space-y-2">
                    <label htmlFor="customRequirements" className="text-sm font-medium">
                      Additional Requirements or Constraints
                    </label>
                    <Textarea
                      id="customRequirements"
                      name="customRequirements"
                      value={requirements.customRequirements}
                      onChange={handleInputChange}
                      placeholder="Any other specific requirements or constraints..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t bg-muted/20 py-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-architect hover:bg-architect-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <>Processing<span className="loading-dots"></span></>
                  ) : (
                    <>Generate Architecture <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
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

// Feature options
const FEATURES = [
  { id: "auth", label: "Authentication & Authorization", description: "User login, registration, and role-based access control" },
  { id: "api", label: "API Integration", description: "Connect with external services and APIs" },
  { id: "ml", label: "Machine Learning / AI", description: "Intelligent features like predictions, recommendations, etc." },
  { id: "realtime", label: "Real-time Features", description: "Live updates, notifications, or collaboration" },
  { id: "offline", label: "Offline Support", description: "Allow app to function without internet connection" },
  { id: "analytics", label: "Analytics & Monitoring", description: "Track usage, performance metrics, and user behavior" },
  { id: "payment", label: "Payment Processing", description: "Handle transactions and subscriptions" },
  { id: "search", label: "Search Functionality", description: "Enable users to search through content" },
  { id: "mobile", label: "Mobile Optimization", description: "Ensure functionality works well on mobile devices" },
  { id: "internationalization", label: "Internationalization", description: "Multi-language and locale support" },
];

export default RequirementsPage;
