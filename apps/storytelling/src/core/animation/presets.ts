export const presets = {
  fadeUp: {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
  },

  fadeUpSmall: {
    opacity: 0,
    y: 20,
    duration: 0.5,
  },

  scaleIn: {
    opacity: 0,
    scale: 0.9,
    duration: 0.7,
  },

  cards: {
    from: {
      opacity: 0,
      y: 40,
      scale: 0.92,
      rotateX: -8,
      transformPerspective: 1000,
    },

    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,

      duration: 0.7,
      ease: 'power3.out',
    },

    stagger: 0.12,
  },
};

export type PresetName = keyof typeof presets;
