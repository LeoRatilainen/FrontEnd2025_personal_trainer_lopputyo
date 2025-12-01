import React, { useState } from "react";

type TabProps = {
  tabs: { label: string; content: React.ReactNode }[];
};

const Tabs: React.FC<TabProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: index === activeIndex ? "2px solid blue" : "2px solid transparent",
              fontWeight: index === activeIndex ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div style={{ marginTop: "20px" }}>
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;