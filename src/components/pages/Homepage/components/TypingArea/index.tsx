import CompletedPart from '../CompletedPart';
import CurrentPart from '../CurrentPart';
import RemainPart from '../RemainPart';
import { useActions } from './useActions';

type TTypingAreaProps = {
  text: string;
};

const TypingArea = ({ text }: TTypingAreaProps) => {
  const {
    inputRef,
    handleContainerClick,
    completedText,
    currentText,
    remainText,
    inputtedText,
    setCurrentWordIndex,
    setInputtedText,
    isLimited,
  } = useActions({ text });

  return (
    <div
      onClick={handleContainerClick}
      style={{ border: '1px solid red', padding: 20, height: 600, margin: 20 }}
    >
      <CompletedPart
        originalText={completedText}
        inputtedText={inputtedText}
      />
      <CurrentPart
        inputRef={inputRef}
        setCurrentWordIndex={setCurrentWordIndex}
        setInputtedText={setInputtedText}
        originalText={currentText}
        isLimited={isLimited}
      />
      <RemainPart text={remainText} />
    </div>
  );
};

export default TypingArea;
