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

export interface Job {
  id: number;
  job_title: string;
  slug: string;
  company_name: string;
  industry_name: string;
  min_salary: number;
  max_salary: number | null;
  currency: string;
  employment_type: string;
  type: string;
  vacancy: number;
  experience: string;
  gender: string;
  is_trending: number;
  is_hot: number;
  view_count: number;
  company: JobCompany;
  category: { id: number; name: string };
  country: { id: number; name: string };
}
