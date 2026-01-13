import { Flex, Section } from '@radix-ui/themes';
import { useActions } from './useActions';
import { AccuracyChart, HistoryDetail, InsightSetting, WPMChart } from './components';
import styles from './styles.module.css';

export const InsightPage = () => {
  const { setDifficulty, data } = useActions();

  return (
    <Section
      px={{ sm: '3rem', md: '6rem', lg: '10rem' }}
      py={{ sm: '1rem', md: '1rem', lg: '2rem' }}
    >
      <Flex
        direction='column'
        gap='9'
      >
        <InsightSetting setDifficulty={setDifficulty} />
        <Flex
          gap='9'
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
