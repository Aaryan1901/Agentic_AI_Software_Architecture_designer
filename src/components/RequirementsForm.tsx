
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export interface ProjectRequirements {
  projectName: string;
  description: string;
  projectType: string;
  scalability: string;
  features: string[];
  budget: string;
  timeline: string;
  team: string;
}

interface RequirementsFormProps {
  onSubmit: (requirements: ProjectRequirements) => void;
}

const RequirementsForm: React.FC<RequirementsFormProps> = ({ onSubmit }) => {
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    projectName: '',
    description: '',
    projectType: '',
    scalability: 'medium',
    features: [],
    budget: '',
    timeline: '',
    team: ''
  });

  const handleChange = (name: keyof ProjectRequirements, value: string) => {
    setRequirements(prev => ({ ...prev, [name]: value }));
  };

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
    onSubmit(requirements);
  };

  const commonFeatures = [
    "Authentication",
    "Database Storage",
    "API Integration",
    "Real-time Updates",
    "File Upload",
    "Search Functionality",
    "Analytics",
    "Payment Processing"
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-architect">Project Requirements</CardTitle>
        <CardDescription>
          Define your software project to generate architecture recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input 
              id="projectName"
              value={requirements.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              placeholder="My Software Project"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea 
              id="description"
              value={requirements.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the purpose and goals of your software project..."
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select 
                onValueChange={(value) => handleChange('projectType', value)}
                value={requirements.projectType}
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webapp">Web Application</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="desktop">Desktop Application</SelectItem>
                  <SelectItem value="api">API / Backend Service</SelectItem>
                  <SelectItem value="iot">IoT System</SelectItem>
                  <SelectItem value="ml">Machine Learning Solution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scalability">Scalability Needs</Label>
              <Select 
                onValueChange={(value) => handleChange('scalability', value)}
                value={requirements.scalability}
              >
                <SelectTrigger id="scalability">
                  <SelectValue placeholder="Select scalability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Small Scale (low traffic)</SelectItem>
                  <SelectItem value="medium">Medium Scale (moderate traffic)</SelectItem>
                  <SelectItem value="high">Large Scale (high traffic)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (global scale)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Common Features</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {commonFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`feature-${feature}`} 
                    checked={requirements.features.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                  />
                  <label 
                    htmlFor={`feature-${feature}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select 
                onValueChange={(value) => handleChange('budget', value)}
                value={requirements.budget}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Under $10,000</SelectItem>
                  <SelectItem value="medium">$10,000 - $50,000</SelectItem>
                  <SelectItem value="high">$50,000 - $200,000</SelectItem>
                  <SelectItem value="enterprise">$200,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select 
                onValueChange={(value) => handleChange('timeline', value)}
                value={requirements.timeline}
              >
                <SelectTrigger id="timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Less than 3 months</SelectItem>
                  <SelectItem value="medium">3-6 months</SelectItem>
                  <SelectItem value="long">6-12 months</SelectItem>
                  <SelectItem value="extended">1+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team">Team Size</Label>
              <Select 
                onValueChange={(value) => handleChange('team', value)}
                value={requirements.team}
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Developer</SelectItem>
                  <SelectItem value="small">Small Team (2-5)</SelectItem>
                  <SelectItem value="medium">Medium Team (6-15)</SelectItem>
                  <SelectItem value="large">Large Team (16+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-architect hover:bg-architect-dark"
          >
            Generate Architecture Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequirementsForm;
