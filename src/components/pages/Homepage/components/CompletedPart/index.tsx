import { Text } from '@radix-ui/themes';
import { useActions } from './useActions';
import { getStyledCharacter } from '@/utils/typingUtils';

type TCompletedPartProps = {
  originalText: string;
  inputtedText: string;
};

const CompletedPart = ({ originalText, inputtedText }: TCompletedPartProps) => {
  const { completedTextRecord } = useActions({ originalText, inputtedText });

  return (
    <Text
      as='span'
      color='green'
      style={{ marginRight: completedTextRecord.length > 0 ? 8 : 0 }}
    >
      {completedTextRecord.map((record, index) => {
        const character = getStyledCharacter(record);

        return (
          character && (
            <Text
              key={index}
              as='span'
              color={character.color}
            >
              {character.value}
            </Text>
          )
        );
      })}
    </Text>
  );
};

export default CompletedPart;
