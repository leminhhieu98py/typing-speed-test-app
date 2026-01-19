import { EDifficulty, EDuration, Emode, ETextCategory } from '@/types/common';
import { ClockIcon, MixerHorizontalIcon, ReloadIcon } from '@radix-ui/react-icons';
import {
  Button,
  Card,
  Flex,
  Heading,
  Section,
  SegmentedControl,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import { memo, type Dispatch, type SetStateAction } from 'react';
import styles from './styles.module.css';

type TSettingAreaProps = {
  isTimeMode: boolean;
  setMode: Dispatch<SetStateAction<Emode>>;
  setDuration: Dispatch<SetStateAction<EDuration>>;
  setTextCategory: Dispatch<SetStateAction<ETextCategory>>;
  setDifficulty: Dispatch<SetStateAction<EDifficulty>>;
  isStarted: boolean;
  handleRestart: () => void;
};

const SettingArea = memo(
  ({
    isTimeMode,
    setMode,
    setDuration,
    setTextCategory,
    setDifficulty,
    isStarted,
    handleRestart,
  }: TSettingAreaProps) => {
    return (
      <Section
        py='0'
        flexGrow='1'
      >
        <Card
          variant='ghost'
          style={{ boxShadow: 'var(--shadow-3)', margin: 0 }}
        >
          <Flex
            mb={{ initial: '2', sm: '3', md: '4', lg: '5' }}
            justify='between'
          >
            <Flex
              gap={{ initial: '1', sm: '2' }}
              align='center'
            >
              <Tooltip content='The paragraph you type is generated based on your selected settings, such as time and difficulty.'>
                <MixerHorizontalIcon color='green' />
              </Tooltip>
              <Heading
                size={{ initial: '2', sm: '3', md: '4', lg: '5' }}
                as='h3'
              >
                Challenge Configuration
              </Heading>
            </Flex>
          </Flex>
          <Flex
            gap={{ initial: '1', sm: '2' }}
            align='end'
            mb={{ initial: '2', sm: '3', md: '4', lg: '5' }}
          >
            <Flex
              direction='column'
              gap={{ initial: '1', sm: '2', md: '3' }}
            >
              <Text
                as='label'
                size={{ initial: '1', md: '2', lg: '3' }}
                color='gray'
              >
                <Flex
                  gap={{ initial: '1', sm: '2' }}
                  align='center'
                  className={styles.iconWrapper}
                >
                  <ClockIcon />
                  <Text>Mode</Text>
                </Flex>
              </Text>
              <SegmentedControl.Root
                size={{ initial: '1', sm: '2' }}
                defaultValue={Emode.TIME}
                onValueChange={(value: Emode) => setMode(value)}
                radius='large'
                disabled={isStarted}
              >
                <SegmentedControl.Item value={Emode.TIME}>
                  <Tooltip content='Type as many words as you can before the timer runs out.'>
                    <Text>Timed</Text>
                  </Tooltip>
                </SegmentedControl.Item>
                <SegmentedControl.Item value={Emode.PASSAGE}>
                  <Tooltip content='Type the entire passage as accurately and quickly as possible.'>
                    <Text>Passage</Text>
                  </Tooltip>
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
            <Button
              size={{ initial: '1', sm: '2' }}
              variant='outline'
              disabled={!isStarted}
              onClick={handleRestart}
            >
              <ReloadIcon /> Restart
            </Button>
          </Flex>
          <Flex
            gapX={{ initial: '1', sm: '3', lg: '6' }}
            gapY={{ initial: '2', sm: '3' }}
            className={styles.settingArea}
          >
            {isTimeMode && (
              <Flex
                direction='column'
                gap={{ initial: '2', sm: '3', md: '4', lg: '5' }}
              >
                <Text
                  as='label'
                  size={{ initial: '1', md: '2', lg: '3' }}
                  color='gray'
                >
                  Duration
                </Text>
                <SegmentedControl.Root
                  defaultValue={EDuration['30_SECONDS']}
                  onValueChange={(value: EDuration) => setDuration(value)}
                  radius='large'
                  disabled={isStarted}
                  size={{ initial: '1', sm: '2' }}
                >
                  <SegmentedControl.Item value={EDuration['15_SECONDS']}>15s</SegmentedControl.Item>
                  <SegmentedControl.Item value={EDuration['30_SECONDS']}>30s</SegmentedControl.Item>
                  <SegmentedControl.Item value={EDuration['60_SECONDS']}>60s</SegmentedControl.Item>
                  <SegmentedControl.Item value={EDuration['120_SECONDS']}>
                    120s
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>
            )}
            <Flex
              direction='column'
              gap={{ initial: '2', sm: '3', md: '4', lg: '5' }}
            >
              <Text
                as='label'
                size={{ initial: '1', md: '2', lg: '3' }}
                color='gray'
              >
                Difficulty
              </Text>
              <SegmentedControl.Root
                defaultValue={EDifficulty.MEDIUM}
                onValueChange={(value: EDifficulty) => setDifficulty(value)}
                radius='large'
                disabled={isStarted}
                size={{ initial: '1', sm: '2' }}
              >
                <SegmentedControl.Item value={EDifficulty.EASY}>Easy</SegmentedControl.Item>
                <SegmentedControl.Item value={EDifficulty.MEDIUM}>Medium</SegmentedControl.Item>
                <SegmentedControl.Item value={EDifficulty.HARD}>Hard</SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
            <Flex
              direction='column'
              gap={{ initial: '2', sm: '3', md: '4', lg: '5' }}
            >
              <Text
                as='label'
                size={{ initial: '1', md: '2', lg: '3' }}
                color='gray'
              >
                Category
              </Text>
              <SegmentedControl.Root
                defaultValue={ETextCategory.CLASSIC}
                onValueChange={(value: ETextCategory) => setTextCategory(value)}
                radius='large'
                disabled={isStarted}
                size={{ initial: '1', sm: '2' }}
              >
                <SegmentedControl.Item value={ETextCategory.CLASSIC}>Classic</SegmentedControl.Item>
                <SegmentedControl.Item value={ETextCategory.SCIENCE}>Science</SegmentedControl.Item>
                <SegmentedControl.Item value={ETextCategory.RHETORIC}>
                  Rhetoric
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Flex>
          </Flex>
        </Card>
      </Section>
    );
  }
);

export default SettingArea;
