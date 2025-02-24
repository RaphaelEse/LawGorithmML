import { useState } from "react";
import { Tabs, Tab } from "@mui/material";

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <div className="p-4">
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Visualization" />
        <Tab label="Performance Metrics" />
        <Tab label="Analysis" />
      </Tabs>

      <div className="mt-4">
        {tabIndex === 0 && <Visualization />}
        {tabIndex === 1 && <PerformanceMetrics />}
        {tabIndex === 2 && <Analysis />}
      </div>
    </div>
  );
}

function Visualization() {
  return <div>Visualization Component Placeholder</div>;
}

function PerformanceMetrics() {
  return <div>Performance Metrics Component Placeholder</div>;
}

function Analysis() {
  return <div>Analysis Component Placeholder</div>;
}
