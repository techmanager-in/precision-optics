"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => {
    const text = encodeURIComponent(
      "Hello Precision Optics! I would like optical advice for luxury frames and prescription lenses."
    );
    window.open(`https://wa.me/919810012345?text=${text}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Circular Trigger Button (When chat popover is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white shadow-emerald-950/20 group"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppLogo className="w-7 h-7 text-white fill-white transition-transform group-hover:scale-105" />
        </button>
      )}

      {/* WhatsApp Chat Popover Card (Matching Exact Reference Design) */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[350px] max-w-[360px] bg-white rounded-[28px] shadow-[0_16px_50px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden font-sans animate-in slide-in-from-bottom-4 fade-in duration-200 select-none">
          {/* Green Header */}
          <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <WhatsAppLogo className="w-7 h-7 text-white fill-white" />
              <h3 className="text-white font-bold text-lg tracking-tight">WhatsApp</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#1DA851] hover:bg-[#188C43] flex items-center justify-center text-white transition-colors cursor-pointer focus:outline-none"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* White Chat Body */}
          <div className="bg-[#F8F9FA] p-5 space-y-4">
            {/* Message Bubble 1 */}
            <div className="flex items-start">
              <div className="relative bg-white text-[#374151] text-[13.5px] font-sans font-normal px-5 py-3 rounded-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100/80 max-w-[90%] leading-relaxed">
                {/* Speech Bubble Left Tail */}
                <div
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_1px_1px_rgba(0,0,0,0.03)]"
                  aria-hidden="true"
                />
                hello 👋, welcome to Precision Optics
              </div>
            </div>

            {/* Message Bubble 2 */}
            <div className="flex items-start">
              <div className="relative bg-white text-[#374151] text-[13.5px] font-sans font-normal px-5 py-3 rounded-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100/80 max-w-[80%] leading-relaxed">
                {/* Speech Bubble Left Tail */}
                <div
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_1px_1px_rgba(0,0,0,0.03)]"
                  aria-hidden="true"
                />
                How can we help you?
              </div>
            </div>

            {/* Bottom Right Open Chat Action */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={handleOpenChat}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans font-bold text-[14px] px-6 py-2.5 rounded-full flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Open Chat</span>
                <WhatsAppLogo className="w-5 h-5 text-white fill-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
