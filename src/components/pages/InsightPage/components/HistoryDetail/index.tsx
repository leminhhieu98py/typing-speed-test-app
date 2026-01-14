import type { TResult } from '@/types/common';
import { Table } from '@radix-ui/themes';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type THistoryDetailProps = {
  data: TResult[];
};

const HistoryDetail = ({ data }: THistoryDetailProps) => {
  const reverseData = useMemo(() => [...data].reverse(), [data]);
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell align='center'>WPM</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align='center'>Accuracy</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align='center'>Duration (seconds)</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align='center'>Correct</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align='center'>Errors</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align='center'>Time recorded</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {reverseData.length > 0 ? (
          reverseData.map((item) => (
            <Table.Row>
              <Table.Cell align='center'>{item.wpm || '-'}</Table.Cell>
              <Table.Cell align='center'>{item.accuracy || '-'}%</Table.Cell>
              <Table.Cell align='center'>{item.duration || '-'}</Table.Cell>
              <Table.Cell align='center'>{item.correctChars || '-'}</Table.Cell>
              <Table.Cell align='center'>{item.incorrectChars || '-'}</Table.Cell>
              <Table.Cell align='center'>
                {item.recordedTimestamp
                  ? dayjs(item.recordedTimestamp).format('HH:mm DD-MM-YYYY')
                  : '-'}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell
              align='center'
              colSpan={6}
            >
              No history record to display
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default HistoryDetail;
