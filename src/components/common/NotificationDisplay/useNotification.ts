import { useCallback, useState } from 'react';

export const useNotification = () => {
  const [notis, setNotis] = useState<{ id: number; msg: string }[]>([]);

  const showNoti = useCallback((msg: string) => {
    const id = Date.now();
    setNotis((prev) => [...prev, { id, msg }]);
  }, []);

  const removeNoti = useCallback((id: number) => {
    setNotis((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notis, showNoti, removeNoti };
};
