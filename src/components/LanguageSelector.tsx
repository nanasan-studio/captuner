"use client";

import React from "react";
import type { Language } from "~/lib/i18n";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onLanguageChange("en")}
        className={`rounded-md px-3 py-1 text-xs transition-colors ${
          currentLanguage === "en"
            ? "bg-primary/50 text-white"
            : "hover:bg-primary/50 text-white/80 hover:cursor-pointer"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange("ko")}
        className={`rounded-md px-3 py-1 text-xs transition-colors ${
          currentLanguage === "ko"
            ? "bg-primary/50 text-white"
            : "hover:bg-primary/50 text-white/80 hover:cursor-pointer"
        }`}
      >
        KO
      </button>
    </div>
  );
};

export default LanguageSelector;
