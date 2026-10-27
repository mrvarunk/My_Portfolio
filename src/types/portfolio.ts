export interface ProjectArchitecture {
  title: string;
  category: string;
  latencyBadge: string;
  summary: string;
  bullets: string[];
  techStack: string[];
  sourceUrl: string;
  footerTag: string;
  screenshotUrl?: string;
  architectureDetails: {
    pipelineName: string;
    steps: { step: string; detail: string; highlight?: string; colorClass?: string }[];
    metrics: { label: string; value: string; color?: string }[];
    diagramAscii?: string[];
  };
}

export interface MetricCard {
  label: string;
  value: string;
  subValue?: string;
  badge?: string;
  description: string;
  colorClass: string;
}

export interface CPPlatform {
  name: string;
  badge: string;
  badgeClass: string;
  statusText: string;
  rating: number | string;
  ratingLabel: string;
  highlightText: string;
  highlightColor: string;
  sparklinePoints: string;
  sparklinePeak: { cx: number; cy: number };
  stats: { label: string; value: string; valueClass?: string }[];
  verifyUrl: string;
  verifyText: string;
  screenshotUrl?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  iconColor: string;
  skills: { name: string; highlight?: boolean; tagColor?: string }[];
}

export interface EducationItem {
  institution: string;
  period: string;
  degree: string;
  score: string;
  scoreLabel?: string;
  details: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  scopeLabel: string;
  scopeDetail: string;
}

export interface HonorItem {
  type: string;
  typeColor: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  certificateUrl?: string;
}
