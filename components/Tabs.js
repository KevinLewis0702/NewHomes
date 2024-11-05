"use client"

import React, { useState } from 'react'

function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className={index === activeTab ? "tab tab-active" : "tab"}
            aria-label={tab.name}
            checked={index === activeTab}
            onChange={() => handleTabChange(index)}
          />
          <div role="tabpanel" className="tab-content p-10">
            {tab.content}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Tabs