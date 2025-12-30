import { Card, Flex, Section } from '@radix-ui/themes';
import Countdown from '../Countdown';
import RealtimeStats from '../RealtimeStats';

type TRealtimeResultProps = {
  wpm: number;
  accuracy: number;
  count: number;
};

const RealtimeResult = ({ wpm, accuracy, count }: TRealtimeResultProps) => {
  return (
    <Section
      py={{ sm: '1rem', md: '2rem' }}
      pt={'0'}
    >
      <Card
        variant='ghost'
        style={{ backgroundColor: 'var(--green-3)', margin: 0, boxShadow: 'var(--shadow-3)' }}
      >
        <Flex
          justify='between'
          align='center'
        >
          <RealtimeStats
            wpm={wpm}
            accuracy={accuracy}
          />
          <Countdown count={count} />
        </Flex>
      </Card>
    </Section>
  );
};

export default RealtimeResult;
