import { type ViewProps } from "react-native";
import { type Job, type Industry, type Company } from "./api.type";

export interface JobCardProps extends ViewProps {
  job: Job;
  index: number;
}

export interface IndustryCardProps extends ViewProps {
  industry: Industry;
  index: number;
}

export interface CompanyCardProps extends ViewProps {
  company: Company;
  index: number;
}
