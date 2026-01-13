import { COMMON_DATE_FORMAT } from '@/constants';
import type { TResult } from '@/types/common';
import { Text } from '@radix-ui/themes';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  CartesianGrid,
  DefaultTooltipContent,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type TAccuracyChartProps = {
  data: TResult[];
};

const AccuracyChart = ({ data }: TAccuracyChartProps) => {
  const filterData: TResult[] = useMemo(() => {
    const highestAccuracyByDayData: TResult[] = [];
    let currentDay: undefined | string = undefined;

    data.forEach((item, index) => {
      const day = dayjs(item.recordedTimestamp).format(COMMON_DATE_FORMAT);
      const prevAccuracy = data[index - 1]?.accuracy;

      if (index === 0 || day !== currentDay) {
        highestAccuracyByDayData.push(item);
        currentDay = day;
      } else if (
        day === currentDay &&
        item.accuracy &&
        prevAccuracy &&
        item.accuracy > prevAccuracy
      ) {
        highestAccuracyByDayData.splice(-1, 1, item);
      }
    });

    return highestAccuracyByDayData;
  }, [data]);

  return (
    <LineChart
      style={{
        width: '100%',
        minWidth: 360,
        height: '100%',
        aspectRatio: 1.618,
      }}
      responsive
      data={filterData}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={() => ''} />
      <YAxis
        dataKey='accuracy'
        width='auto'
      />
      <Tooltip
        content={
          <DefaultTooltipContent
            accessibilityLayer={true}
            labelFormatter={(_, payload) => {
              const timestamp = payload?.[0]?.payload.recordedTimestamp;
              const time = timestamp ? dayjs(timestamp).format(COMMON_DATE_FORMAT) : '-';

              return <Text color='indigo'>{time}</Text>;
            }}
          />
        }
      />
      <Legend />
      <Line
        type='natural'
        dataKey='accuracy'
        stroke='#002bb7c5'
      />
    </LineChart>
  );
};

export default AccuracyChart;
