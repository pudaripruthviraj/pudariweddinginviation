import confetti from 'canvas-confetti';

export function triggerAkshinthaluShower() {
  // Dispatch custom event to AmbientPetals canvas for natural falling petals
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('shower_akshinthalu_burst'));
  }

  // Marigold yellow, turmeric golden, vermilion kumkum red, and fresh green leaf colors
  const colors = ['#F59E0B', '#FBBF24', '#DC2626', '#B45309', '#15803D', '#FEF08A'];

  // Left side burst
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors,
    shapes: ['circle', 'square'],
    scalar: 1.1,
    drift: 0.1,
  });

  // Right side burst
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors,
    shapes: ['circle', 'square'],
    scalar: 1.1,
    drift: -0.1,
  });

  // Gentle flower petals floating down from above
  setTimeout(() => {
    confetti({
      particleCount: 65,
      spread: 100,
      origin: { y: 0.15 },
      colors,
      gravity: 0.8,
      scalar: 1.2,
      ticks: 200,
    });
  }, 180);
}
