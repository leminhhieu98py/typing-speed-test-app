import { Text } from '@radix-ui/themes';
import { useActions } from './useActions';

type TRemainPartProps = {
  text: string;
};

const RemainPart = ({ text }: TRemainPartProps) => {
  useActions();

  return (
    <Text
      size='8'
      style={{ color: 'var(--gray-6)' }}
    >
      {text}
    </Text>
  );
};

export default RemainPart;
