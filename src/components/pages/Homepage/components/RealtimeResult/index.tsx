import { Card, Flex, Section } from '@radix-ui/themes';
import Countdown from '../Countdown';
import RealtimeStats from '../RealtimeStats';

type TRealtimeResultProps = {
  wpm: number;
  accuracy: number;
  count: number;
  isTimeMode: boolean;
};

const RealtimeResult = ({ wpm, accuracy, count, isTimeMode }: TRealtimeResultProps) => {
  return (
    <Section py='0'>
      <Card
        variant='ghost'
        style={{ backgroundColor: 'var(--green-3)', margin: 0, boxShadow: 'var(--shadow-3)' }}
      >
        <Flex
          direction='column'
          align='start'
          gapY='1rem'
        >
          <RealtimeStats
            wpm={wpm}
            accuracy={accuracy}
          />
          <Countdown
            count={count}
            isTimeMode={isTimeMode}
          />
        </Flex>
      </Card>
    </Section>
  );
};

export default RealtimeResult;
