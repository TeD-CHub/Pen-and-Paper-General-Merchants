"use client";

// Usage: <Tabs label="Product details" tabs={[{ id: "info", label: "Details", content: ... }]} />
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  label: string;
  tabs: TabItem[];
}

export function Tabs({ label, tabs }: TabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    setActiveId(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-neutral-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeId === tab.id ? 0 : -1}
            onClick={() => setActiveId(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={clsx(
              "min-h-11 shrink-0 border-b-2 px-4 py-2 font-semibold",
              activeId === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-neutral-700 hover:text-primary",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab ? (
        <div
          id={`${activeTab.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab.id}-tab`}
          tabIndex={0}
          className="py-4 text-neutral-700"
        >
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
}
