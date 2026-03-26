"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ChatBubbleProps {
  text: string;
  time: string;
  fromUser?: boolean;
  delay: number;
}

function ChatBubble({ text, time, fromUser = false, delay }: ChatBubbleProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex ${fromUser ? "justify-end" : "justify-start"} transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className={`relative max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
          fromUser
            ? "bg-[#d9fdd3] rounded-tr-sm"
            : "bg-white rounded-tl-sm"
        }`}
      >
        <p className="text-[13px] text-[#111b21] leading-relaxed">{text}</p>
        <p className={`text-[10px] mt-1 text-end ${fromUser ? "text-[#667781]" : "text-[#667781]"}`}>
          {time}
          {fromUser && (
            <svg width="16" height="11" viewBox="0 0 16 11" className="inline-block ms-1 text-[#53bdeb]">
              <path d="M11.07 0.66L4.98 6.75L2.91 4.68L1.5 6.09L4.98 9.58L12.48 2.07L11.07 0.66Z" fill="currentColor" />
              <path d="M14.07 0.66L7.98 6.75L7.03 5.8L5.62 7.21L7.98 9.58L15.48 2.07L14.07 0.66Z" fill="currentColor" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator({ delay }: { delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    const hideTimer = setTimeout(() => setHide(true), delay + 1800);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [delay]);

  if (!visible || hide) return null;

  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export function ContactChatPreview() {
  const t = useTranslations("contactChat");

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="rounded-[2rem] border border-border/80 bg-[#efeae2] shadow-2xl shadow-foreground/[0.06] overflow-hidden max-w-[340px] mx-auto">
        {/* WhatsApp header */}
        <div className="bg-[#008069] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">Tadnun</p>
            <p className="text-white/70 text-[11px]">{t("online")}</p>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        </div>

        {/* Chat wallpaper area */}
        <div className="relative px-3 py-4 space-y-2.5 min-h-[420px]">
          {/* Wallpaper pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5zM10 25L15 35H5L10 25zM50 25L55 35H45L50 25zM30 45L35 55H25L30 45z' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E")`,
          }} />

          {/* Today badge */}
          <div className="flex justify-center mb-3">
            <span className="bg-white/90 text-[11px] text-[#667781] px-3 py-1 rounded-lg shadow-sm">
              {t("today")}
            </span>
          </div>

          {/* User message */}
          <ChatBubble
            text={t("userMsg")}
            time="14:23"
            fromUser
            delay={600}
          />

          {/* Typing indicator then response */}
          <TypingIndicator delay={1800} />

          {/* Tadnun reply */}
          <ChatBubble
            text={t("replyMsg1")}
            time="14:24"
            delay={3600}
          />

          <ChatBubble
            text={t("replyMsg2")}
            time="14:24"
            delay={4400}
          />
        </div>

        {/* Input bar */}
        <div className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2">
            <p className="text-[13px] text-[#667781]">{t("inputPlaceholder")}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#008069] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M16.6 8.6L12.4 12.8L8.6 8.6L7.2 10L12.4 15.2L17.6 10L16.6 8.6Z" transform="rotate(-90 12 12)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative glow behind the phone */}
      <div className="absolute -inset-8 bg-[#25D366]/[0.04] rounded-[3rem] -z-10 blur-2xl" />
    </div>
  );
}
