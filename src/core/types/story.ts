import type { TransitionName } from '@/core/transitions/registry';

export type SlideAPI = {
  el: HTMLElement;
  timeline: GSAPTimeline;
};

export type StoryScene = {
  id: string;
  transition: TransitionName;
};

export type TransitionContext = {
  from: SlideAPI;
  to: SlideAPI;
  dir: 1 | -1;
};
