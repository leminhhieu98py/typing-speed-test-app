import { secondsToMMSS } from '@/utils/commonUtils';
import { Box, Flex, Strong, Text } from '@radix-ui/themes';
import { memo } from 'react';

type TCountdownProps = {
  count: number;
  isTimeMode: boolean;
};

const Countdown = memo(({ count, isTimeMode }: TCountdownProps) => {
  const isWarning = count <= 10;

  return (
    <Box>
      <Flex
        direction='column'
        gap='1'
      >
        <Text
          color='gray'
          size={{ sm: '1', md: '2', lg: '3' }}
        >
          Time Remaining
        </Text>
        <Text
          color={isWarning && isTimeMode ? 'red' : 'gray'}
          size='6'
          highContrast={!isWarning || !isTimeMode}
        >
          <Strong>{secondsToMMSS(count)}</Strong>
        </Text>
      </Flex>
    </Box>
  );
});

export default Countdown;
