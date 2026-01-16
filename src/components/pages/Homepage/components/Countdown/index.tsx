import { secondsToMMSS } from '@/utils/commonUtils';
import { Flex, Strong, Text } from '@radix-ui/themes';
import { memo } from 'react';

type TCountdownProps = {
  count: number;
  isTimeMode: boolean;
};

const Countdown = memo(({ count, isTimeMode }: TCountdownProps) => {
  const isWarning = count <= 10;

  return (
    <Flex
      direction='column'
      gap='1'
    >
      <Text
        color='gray'
        size={{ initial: '1', xs: '2', md: '3', lg: '4' }}
      >
        Time Remaining
      </Text>
      <Text
        color={isWarning && isTimeMode ? 'red' : 'gray'}
        size={{ initial: '2', xs: '3', md: '5', lg: '7' }}
        highContrast={!isWarning || !isTimeMode}
      >
        <Strong>{secondsToMMSS(count)}</Strong>
      </Text>
    </Flex>
  );
});

export default Countdown;
