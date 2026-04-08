export const API_BASE = 'https://dev.bhcjobs.com/api';
export const STORAGE_BASE = 'https://dev.bhcjobs.com/storage';

export const API = {
  industries: `${API_BASE}/industry/get`,
  jobs: `${API_BASE}/job/get`,
  companies: `${API_BASE}/company/get`,
  login: `${API_BASE}/job_seeker/login`,
  register: `${API_BASE}/job_seeker/register`,
  verifyOtp: `${API_BASE}/job_seeker/phone_verify`,
} as const;

export const getImageUrl = (folder: 'industry-image' | 'company-image', filename: string) =>
  `${STORAGE_BASE}/${folder}/${filename}`;
