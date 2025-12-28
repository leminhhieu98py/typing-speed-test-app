import type { ChangeObject } from 'diff/lib/types.js';

export const getRandomText = (texts: string[]) => {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

export const getStyledCharacter = (
  char: ChangeObject<string>
): { color: 'green' | 'red' | 'gray'; value: string } | null => {
  const isUnchanged = !char.added && !char.removed;

  if (isUnchanged)
    return {
      color: 'green',
      value: char.value,
    };

  const isInCorrect = char.removed;

  if (isInCorrect)
    return {
      color: 'red',
      value: char.value,
    };

  return null;
};
