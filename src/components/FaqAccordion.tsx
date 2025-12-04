"use client";

import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-4 sm:space-y-3">
      {items.map((item, index) => {
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
          >
            <button
              type="button"
              // 目前所有 FAQ 默认展开，按钮主要用于视觉焦点
              className="flex w-full items-center justify-between gap-4 bg-orange-50 px-4 py-4 text-left sm:px-6 sm:py-4"
            >
              <span className="text-base font-semibold text-[#111827] sm:text-lg">
                {item.question}
              </span>
            </button>
            <div className="border-t border-zinc-100 px-4 py-4 text-sm text-[#4B5563] sm:px-6 sm:py-4">
              {item.answer.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-2" : undefined}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
