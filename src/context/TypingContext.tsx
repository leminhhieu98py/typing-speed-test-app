import { createContext, type Dispatch, useReducer, type PropsWithChildren } from 'react';

type TTypingState = {
  isTyping: boolean;
  showConfirmNavigate: boolean;
  to?: '/result';
};

const initialTypingState: TTypingState = {
  isTyping: false,
  showConfirmNavigate: false,
};

type TTypingAction = {
  type: 'startTyping' | 'stopTyping' | 'showConfirmNavigate' | 'hideConfirmNavigate';
} & Pick<TTypingState, 'to'>;

const typingReducer = (typingState: TTypingState, action: TTypingAction): TTypingState => {
  switch (action.type) {
    case 'startTyping': {
      return {
        ...typingState,
        isTyping: true,
      };
    }
    case 'stopTyping': {
      return {
        ...typingState,
        isTyping: false,
      };
    }
    case 'showConfirmNavigate': {
      return {
        ...typingState,
        showConfirmNavigate: true,
        to: action.to,
      };
    }
    case 'hideConfirmNavigate': {
      return {
        ...typingState,
        showConfirmNavigate: false,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

const TypingContext = createContext<TTypingState | null>(null);
const TypingDispatchContext = createContext<Dispatch<TTypingAction> | null>(null);

const TypingContextProvider = ({ children }: PropsWithChildren) => {
  const [typingState, dispatch] = useReducer(typingReducer, initialTypingState);

  return (
    <TypingContext value={typingState}>
      <TypingDispatchContext value={dispatch}>{children}</TypingDispatchContext>
    </TypingContext>
  );
};

export { TypingContext, TypingDispatchContext, TypingContextProvider };
