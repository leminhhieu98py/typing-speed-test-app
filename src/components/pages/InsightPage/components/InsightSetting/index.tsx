import { Card, Flex, Heading, SegmentedControl, Text, Tooltip } from '@radix-ui/themes';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { EDifficulty } from '@/types/common';
import type { Dispatch, SetStateAction } from 'react';

type TInsightSettingProps = {
  setDifficulty: Dispatch<SetStateAction<EDifficulty>>;
};

const InsightSetting = ({ setDifficulty }: TInsightSettingProps) => {
  return (
    <Card
      variant='ghost'
      style={{ boxShadow: 'var(--shadow-3)', margin: 0 }}
    >
      <Flex
        gap={{ initial: '1', sm: '2' }}
        align='center'
        mb={{ initial: '2', sm: '3', md: '4', lg: '5' }}
      >
        <Tooltip content='Filter history by difficulty'>
          <MixerHorizontalIcon
            color='green'
            width={18}
            height={18}
          />
        </Tooltip>
        <Heading
          size={{ initial: '2', sm: '3', md: '4', lg: '5' }}
          as='h3'
        >
          History Insight Configuration
        </Heading>
      </Flex>
      <Flex
        direction='column'
        gap={{ initial: '2', sm: '3' }}
        style={{ width: 'min-content' }}
      >
        <Text
          as='label'
          size={{ initial: '1', md: '2', lg: '3' }}
          color='gray'
        >
          <Text>Difficulty</Text>
        </Text>
        <SegmentedControl.Root
          defaultValue={EDifficulty.MEDIUM}
          onValueChange={(value: EDifficulty) => setDifficulty(value)}
          radius='large'
          size={{ initial: '1', sm: '2' }}
        >
          <SegmentedControl.Item value={EDifficulty.EASY}>Easy</SegmentedControl.Item>
          <SegmentedControl.Item value={EDifficulty.MEDIUM}>Medium</SegmentedControl.Item>
          <SegmentedControl.Item value={EDifficulty.HARD}>Hard</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Flex>
    </Card>
  );
};

export default InsightSetting;
