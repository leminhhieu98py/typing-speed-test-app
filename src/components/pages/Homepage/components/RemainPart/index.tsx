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
      color='gray'
    >
      {text}
    </Text>
  );
};

export default RemainPart;
