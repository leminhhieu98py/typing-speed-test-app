import { Button, Card, Flex, Section, Separator, Strong, Text } from '@radix-ui/themes';
import { useActions } from './useActions';
import { secondsToMMSS } from '@/utils/commonUtils';
import styles from './styles.module.css';
import { Share1Icon, UpdateIcon } from '@radix-ui/react-icons';

type TInfoCardProps = {
  label: string;
  value: string | number;
  valueColor?: 'green' | 'red' | 'gray';
};

const InfoCard = ({ label, value, valueColor }: TInfoCardProps) => {
  return (
    <Card
      className={styles.cardInfoWrapper}
      variant='ghost'
    >
      <Text
        size='8'
        weight='bold'
        color={valueColor}
      >
        {value}
      </Text>
      <Text
        size='1'
        color='gray'
      >
        {label}
      </Text>
    </Card>
  );
};

export const ResultPage = () => {
  const { title, description, handleStartNewTest, handleShareResult } = useActions();

  return (
    <Section p={{ sm: '3rem', md: '6rem', lg: '10rem' }}>
      <Flex
        gap={{ sm: '1rem', md: '2rem', lg: '3rem' }}
        direction='column'
        align='center'
      >
        <Flex
          direction='column'
          align='center'
          gap='1rem'
        >
          <Text size='8'>
            <Strong>{title}</Strong>
          </Text>
          <Text
            size='2'
            color='gray'
          >
            {description}
          </Text>
        </Flex>
        <Flex
          gap={{ sm: '1rem', md: '2rem', lg: '3rem' }}
          justify='between'
        >
          <InfoCard
            label='ACCURACY'
            value='91%'
          />
          <InfoCard
            label='WORDS PER MIN'
            value={16}
            valueColor='green'
          />
          <InfoCard
            label='TIME'
            value={secondsToMMSS(60)}
          />
        </Flex>
        <Flex
          gap={{ sm: '1rem', md: '2rem', lg: '3rem' }}
          justify='center'
          align='center'
        >
          <Flex
            direction='column'
            align='center'
            gap='0.25rem'
          >
            <Text
              size='4'
              weight='bold'
              color='green'
            >
              20
            </Text>
            <Text
              size='1'
              color='gray'
            >
              CORRECT
            </Text>
          </Flex>
          <Separator
            orientation='vertical'
            size='2'
          />
          <Flex
            direction='column'
            align='center'
            gap='0.25rem'
          >
            <Text
              size='4'
              weight='bold'
              color='ruby'
            >
              2
            </Text>
            <Text
              size='1'
              color='gray'
            >
              ERRORS
            </Text>
          </Flex>
        </Flex>
        <Flex
          gap='1.5rem'
          justify='between'
        >
          <Button
            size='4'
            variant='outline'
            radius='full'
            className={styles.button}
            onClick={handleShareResult}
          >
            <Share1Icon />
            Share result
          </Button>
          <Button
            size='4'
            radius='full'
            className={`${styles.button} ${styles.tryAgainButton}`}
            onClick={handleStartNewTest}
          >
            <UpdateIcon />
            Start new test
          </Button>
        </Flex>
      </Flex>
    </Section>
  );
};
