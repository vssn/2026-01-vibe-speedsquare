import { useState } from "react";
import { RightAngleCalculator } from "./components/RightAngleCalculator";
import { TriangleSideCalculator } from "./components/TriangleSideCalculator";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("right-angle");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Speed Square Calculator</h1>
        
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab("right-angle")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "right-angle"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Calculate right-angle triangle hypothenuse
          </button>
          <button
            onClick={() => setActiveTab("triangle-side")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "triangle-side"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Calculate triangle side
          </button>
        </div>

        <div className="flex justify-center">
          {activeTab === "right-angle" && <RightAngleCalculator />}
          {activeTab === "triangle-side" && <TriangleSideCalculator />}
        </div>
      </div>
    </div>
  );
}

export default App;
