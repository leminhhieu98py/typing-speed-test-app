import { Box, Card, Flex, Heading, SegmentedControl, Text, Tooltip } from '@radix-ui/themes';
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
      <Box mb={{ sm: '3', md: '4', lg: '5' }}>
        <Flex
          gap='2'
          align='center'
        >
          <Tooltip content='Filter history by difficulty'>
            <MixerHorizontalIcon
              color='green'
              width={18}
              height={18}
            />
          </Tooltip>
          <Heading
            size={{ sm: '3', md: '4', lg: '5' }}
            as='h3'
          >
            History Insight Configuration
          </Heading>
        </Flex>
      </Box>
      <Box mb={{ sm: '2', md: '3', lg: '4' }}>
        <Flex
          gap={{ sm: '3', md: '6', lg: '10' }}
          align='end'
        >
          <Flex
            gap='2'
            align='end'
          >
            <Flex
              direction='column'
              gap={{ sm: '2', md: '3' }}
            >
              <Text
                as='label'
                size={{ sm: '1', md: '2', lg: '3' }}
                color='gray'
              >
                <Flex
                  gap='1'
                  align='center'
                >
                  <Text>Difficulty</Text>
                </Flex>
              </Text>
              <SegmentedControl.Root
                defaultValue={EDifficulty.MEDIUM}
                onValueChange={(value: EDifficulty) => setDifficulty(value)}
                radius='large'
              >
                <SegmentedControl.Item value={EDifficulty.EASY}>Easy</SegmentedControl.Item>
                <SegmentedControl.Item value={EDifficulty.MEDIUM}>Medium</SegmentedControl.Item>
                <SegmentedControl.Item value={EDifficulty.HARD}>Hard</SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default InsightSetting;
