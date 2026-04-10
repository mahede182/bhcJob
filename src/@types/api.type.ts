export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Industry {
  id: number;
  priority: number;
  name: string;
  is_active: number;
  image: string;
  jobs_count: number;
}

export interface Company {
  id: number;
  name: string;
  is_active: number;
  slug: string;
  image: string;
  jobs_count: number;
}

export interface JobCompany {
  id: number;
  name: string;
  slug: string;
  desc: string;
  image: string;
  industry_id: number;
  country_id: number;
  industry: { id: number; name: string };
  country: { id: number; name: string };
}

type FoodOption = "provided" | "allowance" | null;

export interface JobCity {
  id: number;
  name: string;
}

export interface Benefit {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  job_title: string;
  slug: string;
  company_name: string;
  industry_name: string;
  min_salary: number;
  max_salary: number | null;
  currency: string;
  salary_type: string;
  employment_type: string;
  type: string;
  vacancy: number;
  experience: string;
  gender: string;
  is_trending: number;
  is_hot: number;
  view_count: number;
  expiry: string | null;
  food_option: FoodOption;
  food_amount: number | null;
  accommodation: number;
  transportation: number;
  iqama: number;
  medical_service: number;
  working_days: number | null;
  working_hours: number | null;
  is_overtime_allowed: number;
  priority: number;
  job_desc: string;
  job_requirement: string;
  recruitment_process: string;
  min_age: number;
  max_age: number;
  edu_title_id: number;
  company: JobCompany;
  category: { id: number; name: string };
  country: { id: number; name: string };
  city: JobCity | null;
  benefits: Benefit[];
  soft_skills: Skill[];
  hard_skills: Skill[];
  languages: Language[];
}
