import React from "react";
import { Button } from "~/components/ui/button";
import { Copy, Check } from "lucide-react";
import type { Language } from "~/lib/i18n";
import { translations } from "~/lib/i18n";

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
  language: Language;
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
  language,
}) => {
  const t = translations[language];
  const isFrameMode = timeUnit === "frames";
  const displayValue = isFrameMode
    ? `${totalFrames}${language === "ko" ? "프레임" : " frames"}`
    : timecode;
  const calculationText = isFrameMode
    ? `${text.length}${language === "ko" ? "글자" : " chars"} × ${charTime}${language === "ko" ? "프레임" : " frames"} = ${totalFrames}${language === "ko" ? "프레임" : " frames"}`
    : `${text.length}${language === "ko" ? "글자" : " chars"} × ${charTime}${language === "ko" ? "초" : "s"} = ${totalSeconds.toFixed(2)}${language === "ko" ? "초" : "s"}`;
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
            {t.copied}
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {t.copy}
          </>
        )}
      </Button>
    </div>
  );
};

export default CalculationResult;
