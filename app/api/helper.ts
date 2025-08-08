const MIN_STATE = 0;
const MAX_STATE = 10;

export const calculateMood = (mood: number, moodShift: number) => {
    return Math.max(MIN_STATE, Math.min((mood + moodShift), MAX_STATE));
}

export const calculateTrust = (trust: number, trustShift: number) => {
    return Math.max(MIN_STATE, Math.min((trust + trustShift), MAX_STATE));
}

export const moodToText = (mood: number) => {
    if (mood <= 3) { return 'annoyed' }

    if (mood > 3 && mood < 7) { return 'neutral'}

    if (mood >= 7) { return 'happy' }
}

export const trustToText = (trust: number) => {
    if (trust <= 3) { return 'untrusting' }

    if (trust > 3 && trust < 7) { return 'neutral' }

    if (trust >= 7) { return 'trusting' }
}