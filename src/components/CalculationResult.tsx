import React from "react";
import { Button } from "~/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CalculationResultProps {
  text: string;
  charTime: number;
  timeUnit: string;
  totalFrames: number;
  totalSeconds: number;
  timecode: string;
  onCopy: (value: string, type: "frame" | "timecode") => void;
  copiedFrame: boolean;
  copiedTimecode: boolean;
}

const CalculationResult: React.FC<CalculationResultProps> = ({
  text,
  charTime,
  timeUnit,
  totalFrames,
  totalSeconds,
  timecode,
  onCopy,
  copiedFrame,
  copiedTimecode,
}) => {
  const isFrameMode = timeUnit === "frames";
  const displayValue = isFrameMode ? `${totalFrames}프레임` : timecode;
  const calculationText = isFrameMode
    ? `${text.length}글자 × ${charTime}프레임 = ${totalFrames}프레임`
    : `${text.length}글자 × ${charTime}초 = ${totalSeconds.toFixed(2)}초`;
  const copyValue = isFrameMode ? totalFrames.toString() : timecode;
  const copyType = isFrameMode ? "frame" : "timecode";
  const isCopied = isFrameMode ? copiedFrame : copiedTimecode;

  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 ${!isFrameMode ? "bg-white" : ""}`}
    >
      <div className="flex-1 space-y-2">
        <div
          className={`text-2xl font-bold ${!isFrameMode ? "font-mono" : ""}`}
        >
          {displayValue}
        </div>
        <div className="text-xs text-gray-500">{calculationText}</div>
      </div>
      <Button
        size="lg"
        onClick={() => onCopy(copyValue, copyType)}
        disabled={text.length === 0}
        className="gap-2"
      >
        {isCopied ? (
          <>
            <Check className="h-4 w-4" />
            복사됨
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            복사
          </>
        )}
      </Button>
    </div>
  );
};

export default CalculationResult;
