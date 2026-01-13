import { COMMON_DATE_FORMAT } from '@/constants';
import type { TResult } from '@/types/common';
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

type TWPMChartProps = {
  data: TResult[];
};

const WPMChart = ({ data }: TWPMChartProps) => {
  const filterData: TResult[] = useMemo(() => {
    const highestWPMByDayData: TResult[] = [];
    let currentDay: undefined | string = undefined;

    data.forEach((item, index) => {
      const day = dayjs(item.recordedTimestamp).format(COMMON_DATE_FORMAT);
      const prevWPM = data[index - 1]?.wpm;

      if (index === 0 || day !== currentDay) {
        highestWPMByDayData.push(item);
        currentDay = day;
      } else if (day === currentDay && item.wpm && prevWPM && item.wpm > prevWPM) {
        highestWPMByDayData.splice(-1, 1, item);
      }
    });

    return highestWPMByDayData;
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
        dataKey='wpm'
        width='auto'
      />
      <Tooltip
        content={
          <DefaultTooltipContent
            accessibilityLayer={true}
            labelFormatter={(_, payload) => {
              const timestamp = payload?.[0]?.payload.recordedTimestamp;
              const time = timestamp ? dayjs(timestamp).format(COMMON_DATE_FORMAT) : '-';

              return <>{time}</>;
            }}
          />
        }
      />
      <Legend />
      <Line
        type='monotone'
        dataKey='wpm'
        stroke='#00824d'
      />
    </LineChart>
  );
};

export default WPMChart;
