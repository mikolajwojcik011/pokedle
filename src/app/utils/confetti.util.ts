import confetti from 'canvas-confetti';

export class ConfettiUtil {
  static triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
