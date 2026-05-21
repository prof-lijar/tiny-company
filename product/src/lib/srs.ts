export interface SRSResult {
  newInterval: number;
  newEaseFactor: number;
}

/**
 * Simplified SM-2 Spaced Repetition Algorithm
 * 
 * Quality scale: 0-5
 * 0: Complete failure (forgot the word)
 * 1: Incorrect response, but corrected after seeing the answer
 * 2: Correct response, but required significant effort
 * 3: Correct response, but required some effort
 * 4: Correct response, with a small hesitation
 * 5: Perfect recall
 */
export function calculateNextReview(
  quality: number, 
  easeFactor: number, 
  interval: number
): SRSResult {
  let newInterval: number;
  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  if (quality < 3) {
    newInterval = 1;
  } else {
    if (interval === 0) {
      newInterval = 1;
    } else if (interval === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
  }

  return {
    newInterval,
    newEaseFactor,
  };
}
