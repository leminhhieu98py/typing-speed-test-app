import { Box, Flex, Strong, Text } from '@radix-ui/themes';

type TRealtimeStatsProps = {
  wpm: number;
  accuracy: number;
};

const RealtimeStats = ({ wpm, accuracy }: TRealtimeStatsProps) => {
  return (
    <Box>
      <Flex gap='1rem'>
        <Flex
          direction='column'
          gap='1'
          width='5rem'
        >
          <Text
            color='gray'
            size={{ sm: '1', md: '2', lg: '3' }}
          >
            {Math.floor(wpm)}
          </Text>
          <Text
            color='green'
            size='6'
          >
            <Strong>0</Strong>
          </Text>
        </Flex>
        <Flex
          direction='column'
          gap='1'
          width='5rem'
        >
          <Text
            color='gray'
            size={{ sm: '1', md: '2', lg: '3' }}
          >
            Accuracy
          </Text>
          <Text
            color='gray'
            size='6'
            highContrast
          >
            <Strong>{Math.floor(accuracy)}%</Strong>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RealtimeStats;
