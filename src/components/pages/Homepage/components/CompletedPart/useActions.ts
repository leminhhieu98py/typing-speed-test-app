import { diffChars, type ChangeObject } from 'diff';

type TActionsProps = {
  originalText: string;
  inputtedText: string;
};

export const useActions = ({ originalText, inputtedText }: TActionsProps) => {
  const completedTextRecord: ChangeObject<string>[] = diffChars(originalText, inputtedText);

  return { completedTextRecord };
};
