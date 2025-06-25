"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { Card, CardContent } from "~/components/ui/card";
import { SegmentedControl } from "~/components/ui/segmented-control";
import CalculationResult from "./CalculationResult";
import CaptunerLogo from "./CaptunerLogo";
import LanguageSelector from "./LanguageSelector";
import Link from "next/link";
import type { Language } from "~/lib/i18n";
import { translations, fpsOptions } from "~/lib/i18n";

interface Settings {
  timeUnit: string;
  charTime: number;
  fps: number;
  language: Language;
}

const CaptionFrameCalculator = () => {
  // localStorage에서 설정을 불러오는 함수
  const loadSettings = (): Settings | null => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem("captuner-settings");
      if (!saved) return null;

      const parsed = JSON.parse(saved) as unknown;

      // 타입 가드: Settings 객체인지 확인
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "timeUnit" in parsed &&
        "charTime" in parsed &&
        "fps" in parsed &&
        "language" in parsed
      ) {
        return parsed as Settings;
      }

      return null;
    } catch (error) {
      console.error("설정 로드 실패:", error);
      return null;
    }
  };

  // 설정을 localStorage에 저장하는 함수
  const saveSettings = (settings: Settings) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("captuner-settings", JSON.stringify(settings));
    } catch (error) {
      console.error("설정 저장 실패:", error);
    }
  };

  // 초기 상태는 기본값으로 설정 (SSR과 일치)
  const [text, setText] = useState("");
  const [timeUnit, setTimeUnit] = useState("frames"); // 'seconds' or 'frames'
  const [charTime, setCharTime] = useState(4); // 기본값: 4프레임
  const [fps, setFps] = useState(29.98);
  const [copiedFrame, setCopiedFrame] = useState(false);
  const [copiedTimecode, setCopiedTimecode] = useState(false);
  const [language, setLanguage] = useState<Language>("en"); // 영어를 기본 언어로 설정
  const [isClient, setIsClient] = useState(false); // 클라이언트 렌더링 여부

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = translations[language];

  // 클라이언트에서만 실행되는 useEffect
  useEffect(() => {
    setIsClient(true);

    // 저장된 설정 불러오기
    const savedSettings = loadSettings();
    if (savedSettings) {
      setTimeUnit(savedSettings.timeUnit);
      setCharTime(savedSettings.charTime);
      setFps(savedSettings.fps);
      setLanguage(savedSettings.language);
    }

    // Textarea에 포커스
    textareaRef.current?.focus();
  }, []);

  // 설정이 변경될 때마다 localStorage에 저장 (클라이언트에서만)
  useEffect(() => {
    if (!isClient) return;

    saveSettings({
      timeUnit,
      charTime,
      fps,
      language,
    });
  }, [timeUnit, charTime, fps, language, isClient]);

  // 계산 함수들
  const calculateFrames = () => {
    const charCount = text.length;
    if (charCount === 0) return 0;

    if (timeUnit === "seconds") {
      // 초 단위일 때: 글자수 × 초/글자 × fps = 프레임
      return Math.round(charCount * charTime * fps);
    } else {
      // 프레임 단위일 때: 글자수 × 프레임/글자
      return charCount * charTime;
    }
  };

  const calculateTotalSeconds = () => {
    const charCount = text.length;
    if (charCount === 0) return 0;

    if (timeUnit === "seconds") {
      // 초 단위일 때: 글자수 × 초/글자
      return charCount * charTime;
    } else {
      // 프레임 단위일 때: 글자수 × 프레임
      return (charCount * charTime) / fps;
    }
  };

  const framesToTimecode = (frames: number) => {
    const totalSeconds = frames / fps;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const remainingFrames = Math.round(frames % fps);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${remainingFrames.toString().padStart(2, "0")}`;
  };

  const totalFrames = calculateFrames();
  const totalSeconds = calculateTotalSeconds();
  const timecode = framesToTimecode(Math.round(totalSeconds * fps));

  // 복사 기능
  const copyToClipboard = async (value: string, type: "frame" | "timecode") => {
    try {
      await navigator.clipboard.writeText(value);
      if (type === "frame") {
        setCopiedFrame(true);
        setTimeout(() => setCopiedFrame(false), 2000);
      } else {
        setCopiedTimecode(true);
        setTimeout(() => setCopiedTimecode(false), 2000);
      }
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  // 글자당 시간 단위 변경 시 값 변환
  const handleTimeUnitChange = (newUnit: string) => {
    if (newUnit !== timeUnit) {
      if (newUnit === "seconds") {
        // 프레임 → 초 변환: 프레임/글자 ÷ fps = 초/글자
        setCharTime(Number((charTime / fps).toFixed(3)));
      } else {
        // 초 → 프레임 변환: 초/글자 × fps = 프레임/글자
        setCharTime(Math.round(charTime * fps));
      }
      setTimeUnit(newUnit);
    }
  };

  // Segmented Control 옵션
  const timeUnitOptions = [
    { value: "frames", label: t.frames },
    { value: "seconds", label: t.seconds },
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center space-y-4 p-6">
      {/* 헤더 */}
      <div className="sm:items-left flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex items-center gap-4">
          <CaptunerLogo />
        </div>
        <p className="text-[#9999FF]/80 sm:text-left">{t.subtitle}</p>
      </div>

      {/* 계산 결과 카드 */}
      <Card>
        <div className="grid grid-cols-1">
          {/* 계산 결과 섹션 */}
          <div className="order-0">
            <CardContent className="space-y-4">
              {/* 글자당 시간 설정 */}
              <div className="space-y-4">
                {/* 단위 선택 - Segmented Control */}
                <SegmentedControl
                  options={timeUnitOptions}
                  value={timeUnit}
                  onValueChange={handleTimeUnitChange}
                />

                {/* 값 입력 */}
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={charTime}
                    onChange={(e) => setCharTime(Number(e.target.value))}
                    step={timeUnit === "seconds" ? "0.01" : "1"}
                    min={timeUnit === "seconds" ? "0.1" : "1"}
                    max={timeUnit === "seconds" ? "2" : "60"}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-700">
                    {timeUnit === "seconds" ? t.seconds : t.frames}
                  </span>
                </div>
              </div>

              {/* 계산 결과 */}
              <CalculationResult
                text={text}
                charTime={charTime}
                timeUnit={timeUnit}
                totalFrames={totalFrames}
                totalSeconds={totalSeconds}
                timecode={timecode}
                onCopy={copyToClipboard}
                copiedFrame={copiedFrame}
                copiedTimecode={copiedTimecode}
                language={language}
              />
            </CardContent>
          </div>
        </div>
      </Card>

      {/* 설정 카드 */}
      <Card>
        <div className="grid grid-cols-1">
          <div className="order-1">
            <CardContent className="space-y-6">
              {/* 텍스트 입력 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="caption-text" className="text-base">
                    {t.captionText}
                  </Label>
                  <span className="text-sm text-gray-500">
                    {text.length} {t.characters}
                  </span>
                </div>
                <Textarea
                  ref={textareaRef}
                  id="caption-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t.placeholder}
                  className="h-24 resize-none"
                />
              </div>

              {/* FPS 설정 */}
              <div className="space-y-2">
                <Label htmlFor="fps-select" className="text-base">
                  {t.fpsSetting}
                </Label>
                <Select
                  value={fps.toString()}
                  onValueChange={(value) => setFps(Number(value))}
                >
                  <SelectTrigger id="fps-select" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fpsOptions[language].map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      <div className="flex items-center justify-between">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
        <Link
          href="https://nanasan.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/80 hover:text-primary/60 block cursor-pointer"
        >
          {t.copyright}
        </Link>
      </div>
    </div>
  );
};

export default CaptionFrameCalculator;
