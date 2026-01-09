import styles from './styles.module.css';
import { Toast } from '../Toast';

export const NotificationDisplay = ({
  notis,
  onRemove,
}: {
  notis: { id: number; msg: string }[];
  onRemove: (id: number) => void;
}) => {
  return (
    <div className={styles.notificationContainer}>
      {notis.map((n) => (
        <Toast
          key={n.id}
          id={n.id}
          message={n.msg}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
