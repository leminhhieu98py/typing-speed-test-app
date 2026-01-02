import { secondsToMMSS } from '@/utils/commonUtils';
import { Box, Flex, Strong, Text } from '@radix-ui/themes';
import { memo } from 'react';

type TCountdownProps = {
  count: number;
};

const Countdown = memo(({ count }: TCountdownProps) => {
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
          color='gray'
          size='6'
          highContrast
        >
          <Strong>{secondsToMMSS(count)}</Strong>
        </Text>
      </Flex>
    </Box>
  );
});

export default Countdown;
