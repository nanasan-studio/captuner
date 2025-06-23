export type Language = "en" | "ko";

export interface Translations {
  title: string;
  subtitle: string;
  captionText: string;
  characters: string;
  fpsSetting: string;
  frames: string;
  seconds: string;
  perCharacter: string;
  calculationResult: string;
  totalFrames: string;
  totalSeconds: string;
  timecode: string;
  copy: string;
  copied: string;
  placeholder: string;
  copyright: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "Captuner",
    subtitle: "Caption Duration Calculator",
    captionText: "Caption",
    characters: "characters",
    fpsSetting: "FPS Setting",
    frames: "Frames",
    seconds: "Seconds",
    perCharacter: "per character",
    calculationResult: "Calculation Result",
    totalFrames: "Total Frames",
    totalSeconds: "Total Seconds",
    timecode: "Timecode",
    copy: "Copy",
    copied: "Copied!",
    placeholder: "Enter caption content...",
    copyright: "© 2025, nanasan",
  },
  ko: {
    title: "Captuner",
    subtitle: "글자 수 기반 캡션 시간 / 프레임 계산기",
    captionText: "캡션",
    characters: "글자",
    fpsSetting: "FPS 설정",
    frames: "프레임",
    seconds: "초",
    perCharacter: "글자당",
    calculationResult: "계산 결과",
    totalFrames: "총 프레임",
    totalSeconds: "총 초",
    timecode: "타임코드",
    copy: "복사",
    copied: "복사됨!",
    placeholder: "캡션을 입력하세요...",
    copyright: "© 2025, nanasan",
  },
};

export const fpsOptions = {
  en: [
    { value: 10.0, label: "10.00 fps" },
    { value: 12.0, label: "12.00 fps" },
    { value: 12.5, label: "12.50 fps" },
    { value: 15.0, label: "15.00 fps" },
    { value: 23.976, label: "23.976 fps" },
    { value: 24.0, label: "24.00 fps" },
    { value: 25.0, label: "25.00 fps" },
    { value: 29.97, label: "29.97 fps" },
    { value: 29.98, label: "29.98 fps" },
    { value: 30.0, label: "30.00 fps" },
    { value: 50.0, label: "50.00 fps" },
    { value: 59.94, label: "59.94 fps" },
    { value: 60.0, label: "60.00 fps" },
  ],
  ko: [
    { value: 10.0, label: "10.00 프레임/초" },
    { value: 12.0, label: "12.00 프레임/초" },
    { value: 12.5, label: "12.50 프레임/초" },
    { value: 15.0, label: "15.00 프레임/초" },
    { value: 23.976, label: "23.976 프레임/초" },
    { value: 24.0, label: "24.00 프레임/초" },
    { value: 25.0, label: "25.00 프레임/초" },
    { value: 29.97, label: "29.97 프레임/초" },
    { value: 29.98, label: "29.98 프레임/초" },
    { value: 30.0, label: "30.00 프레임/초" },
    { value: 50.0, label: "50.00 프레임/초" },
    { value: 59.94, label: "59.94 프레임/초" },
    { value: 60.0, label: "60.00 프레임/초" },
  ],
};
