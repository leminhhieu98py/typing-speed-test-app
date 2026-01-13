import { TypingContext, TypingDispatchContext } from '@/context/TypingContext';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';

export const useActions = () => {
  const typingState = useContext(TypingContext);
  const dispatch = useContext(TypingDispatchContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch?.({ type: 'hideConfirmNavigate' });
  };

  const handleConfirm = () => {
    if (typingState?.to) {
      navigate({ to: typingState.to });
    }
    dispatch?.({ type: 'hideConfirmNavigate' });
    dispatch?.({ type: 'stopTyping' });
  };

  return { typingState, handleCancel, handleConfirm };
};
