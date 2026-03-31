"use client";

import { useEffect, useState, useRef } from "react";
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

/** Instant bubble — no delay, appears immediately */
function InstantBubble({ text, time, fromUser = false }: { text: string; time: string; fromUser?: boolean }) {
  return (
    <div className={`flex ${fromUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] rounded-2xl px-3.5 py-2.5 animate-[fadeScale_0.3s_ease-out] ${
          fromUser ? "bg-[#d9fdd3] rounded-tr-sm" : "bg-white rounded-tl-sm"
        }`}
      >
        <p className="text-[13px] text-[#111b21] leading-relaxed">{text}</p>
        <p className="text-[10px] mt-1 text-end text-[#667781]">
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

function LiveTypingDots() {
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

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function ContactChatPreview() {
  const t = useTranslations("contactChat");
  const [userMessages, setUserMessages] = useState<{ text: string; time: string }[]>([]);
  const [replyMessages, setReplyMessages] = useState<{ text: string; time: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState<"message" | "contact" | "done">("message");
  const [savedMessage, setSavedMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Pre-resolve translations so they work inside setTimeout callbacks
  const askContactText = t("askContact");
  const autoReplyText = t("autoReply");

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [userMessages, replyMessages, typing]);

  async function handleSend() {
    const msg = inputValue.trim();
    if (!msg || step === "done") return;

    setInputValue("");
    setUserMessages((prev) => [...prev, { text: msg, time: currentTime() }]);

    if (step === "message") {
      // Step 1: User sent their message → ask for contact info
      setSavedMessage(msg);
      setTimeout(() => setTyping(true), 800);
      setTimeout(() => {
        setTyping(false);
        setReplyMessages((prev) => [...prev, { text: askContactText, time: currentTime() }]);
        setStep("contact");
      }, 2500);
    } else if (step === "contact") {
      // Step 2: User sent their contact info → send everything to API
      const contactInfo = msg;

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Chat visitor",
            contact: contactInfo,
            message: savedMessage,
            _t: Date.now() - 5000,
          }),
        });
      } catch {
        // silently fail
      }

      setTimeout(() => setTyping(true), 800);
      setTimeout(() => {
        setTyping(false);
        setReplyMessages((prev) => [...prev, { text: autoReplyText, time: currentTime() }]);
        setStep("done");
      }, 2500);
    }
  }

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

        {/* Chat area */}
        <div ref={chatRef} className="relative px-3 py-4 space-y-2.5 min-h-[420px] max-h-[420px] overflow-y-auto">
          {/* Wallpaper */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5zM10 25L15 35H5L10 25zM50 25L55 35H45L50 25zM30 45L35 55H25L30 45z' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E")`,
          }} />

          {/* Today badge */}
          <div className="flex justify-center mb-3">
            <span className="bg-white/90 text-[11px] text-[#667781] px-3 py-1 rounded-lg shadow-sm">
              {t("today")}
            </span>
          </div>

          {/* Scripted messages */}
          <ChatBubble text={t("userMsg")} time="14:23" fromUser delay={600} />
          <TypingIndicator delay={1800} />
          <ChatBubble text={t("replyMsg1")} time="14:24" delay={3600} />
          <ChatBubble text={t("replyMsg2")} time="14:24" delay={4400} />

          {/* Live user messages */}
          {userMessages.map((msg, i) => (
            <InstantBubble key={`u-${i}`} text={msg.text} time={msg.time} fromUser />
          ))}

          {/* Typing indicator for live reply */}
          {typing && <LiveTypingDots />}

          {/* Live replies */}
          {replyMessages.map((msg, i) => (
            <InstantBubble key={`r-${i}`} text={msg.text} time={msg.time} />
          ))}
        </div>

        {/* Input bar — functional */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={step === "done"}
            placeholder={
              step === "done"
                ? t("sentPlaceholder")
                : step === "contact"
                  ? t("contactPlaceholder")
                  : t("inputPlaceholder")
            }
            className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-[#111b21] placeholder:text-[#667781] outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || step === "done"}
            className="w-9 h-9 rounded-full bg-[#008069] flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-8 bg-[#25D366]/[0.04] rounded-[3rem] -z-10 blur-2xl" />
    </div>
  );
}
