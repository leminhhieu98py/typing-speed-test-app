import { Flex, Strong, Text } from '@radix-ui/themes';

type TRealtimeStatsProps = {
  wpm: number;
  accuracy: number;
};

const RealtimeStats = ({ wpm, accuracy }: TRealtimeStatsProps) => {
  return (
    <Flex
      direction={{ initial: 'column', xs: 'row' }}
      gap={{ initial: '1', xs: '2', lg: '4' }}
    >
      <Flex
        direction='column'
        gap='1'
        width={{ initial: '4rem', xs: '6rem', md: '6rem', lg: '9rem' }}
      >
        <Text
          color='gray'
          size={{ initial: '1', xs: '2', md: '3', lg: '4' }}
        >
          WPM
        </Text>
        <Text
          color='green'
          size={{ initial: '2', xs: '3', md: '5', lg: '7' }}
        >
          <Strong> {Math.floor(wpm)}</Strong>
        </Text>
      </Flex>
      <Flex
        direction='column'
        gap='1'
        width={{ initial: '4rem', xs: '6rem', md: '6rem', lg: '9rem' }}
      >
        <Text
          color='gray'
          size={{ initial: '1', xs: '2', md: '3', lg: '4' }}
        >
          Accuracy
        </Text>
        <Text
          color='gray'
          size={{ initial: '2', xs: '3', md: '5', lg: '7' }}
          highContrast
        >
          <Strong>{Math.floor(accuracy)}%</Strong>
        </Text>
      </Flex>
    </Flex>
  );
};

export default RealtimeStats;
