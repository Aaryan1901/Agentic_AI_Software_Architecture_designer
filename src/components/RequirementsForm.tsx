
import { ReactNode } from 'react';

export interface ProjectRequirements {
  projectName: string;
  projectType: string;
  description: string;
  scale?: string;
  budget?: string;
  timeConstraints?: string;
  security?: string;
  features: string[];
  customRequirements?: string;
}

export interface RequirementsFormProps {
  children?: ReactNode;
}
