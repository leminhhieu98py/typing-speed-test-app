import { useActions } from './useActions';
import styles from './styles.module.css';
import { Text } from '@radix-ui/themes';

type TToastProps = {
  message: string;
  id: number;
  onRemove: (id: number) => void;
};

export const Toast = ({ message, id, onRemove }: TToastProps) => {
  useActions({ id, onRemove });

  return (
    <div className={styles.toast}>
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
      >
        <path d='M20 6L9 17l-5-5' />
      </svg>
      <Text size={'3'}>{message}</Text>
    </div>
  );
};
