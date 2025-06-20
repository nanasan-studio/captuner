import React, { useRef, useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const SegmentedControl = ({
  options,
  value,
  onValueChange,
  className,
}: SegmentedControlProps) => {
  const tabCount = options.length;

  // 탭 버튼 ref 배열
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

  // 선택된 탭의 위치와 크기를 계산하여 barStyle 업데이트
  useEffect(() => {
    const idx = options.findIndex((opt) => opt.value === value);
    const btn = tabRefs.current[idx];
    if (btn) {
      setBarStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, [value, options]);

  return (
    <div
      className={cn(
        "relative flex rounded-full border bg-gray-50 p-1",
        className,
      )}
      style={{ overflow: "hidden" }}
    >
      {options.map((option, idx) => (
        <button
          key={option.value}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          onClick={() => onValueChange(option.value)}
          className={cn(
            "relative z-10 flex-1 rounded-full px-4 py-2 font-medium transition-colors duration-300 ease-in-out",
            value === option.value
              ? "bg-primary text-white"
              : "bg-transparent text-gray-600 hover:text-gray-900",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
  return null;
};

export { SegmentedControl };
