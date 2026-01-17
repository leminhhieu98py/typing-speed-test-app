import { Flex, Section } from '@radix-ui/themes';
import { useActions } from './useActions';
import { AccuracyChart, HistoryDetail, InsightSetting, WPMChart } from './components';
import styles from './styles.module.css';

export const InsightPage = () => {
  const { setDifficulty, data } = useActions();

  return (
    <Section
      px={{ initial: '2', sm: '4', md: '6', lg: '9' }}
      py={{ initial: '2', sm: '4', md: '6' }}
    >
      <Flex
        direction='column'
        gap={{ initial: '4', sm: '9' }}
      >
        <InsightSetting setDifficulty={setDifficulty} />
        <Flex
          gap={{ initial: '4', md: '9' }}
          className={styles.chartWrapper}
        >
          <WPMChart data={data} />
          <AccuracyChart data={data} />
        </Flex>
        <HistoryDetail data={data} />
      </Flex>
    </Section>
  );
};
