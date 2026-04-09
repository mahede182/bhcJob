export interface ProfileStat {
  label: string;
  value: string | number;
  key: string;
}

export interface ProfileStatsProps {
  stats: ProfileStat[];
}
