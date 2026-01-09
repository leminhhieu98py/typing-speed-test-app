import { useEffect } from 'react';

type TActionsProps = {
  id: number;
  onRemove: (id: number) => void;
};

export const useActions = ({ id, onRemove }: TActionsProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);
};
