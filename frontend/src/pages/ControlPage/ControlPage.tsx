import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusPanel from "./StatusPanel";
import ChartsPanel from "./ChartsPanel";
import ControlPanel from "./ControlPanel";
import AlertsPanel from "./AlertsPanel";

// Mock data
const mockAquariums = [
  { id: "AQ001", name: "Hồ Cá Vàng", temperature: 28.5, waterLevel: 85, status: "active" },
  { id: "AQ002", name: "Hồ Cá Koi", temperature: 32.1, waterLevel: 55, status: "warning" },
  { id: "AQ003", name: "Hồ Nhiệt Đới", temperature: 27.2, waterLevel: 90, status: "active" },
];

const ControlPage = () => {
  const { id } = useParams<{ id: string }>();
  const aquarium = mockAquariums.find((aq) => aq.id === id);

  const [pumpEnabled, setPumpEnabled] = useState(true);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [automationEnabled, setAutomationEnabled] = useState(false);

  const handleFeedFish = () => alert("Đã kích hoạt servo cho ăn!");

  const recentAlerts = [
    { id: 1, message: "Nhiệt độ cao lúc 14:00", time: "14:00", type: "warning" },
    { id: 2, message: "Mực nước thấp lúc 10:30", time: "10:30", type: "warning" },
  ];

  if (!aquarium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
        <h2 className="text-2xl font-bold">Không tìm thấy hồ cá</h2>
        <Link to="/aquariums">
          <Button className="mt-4">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/aquariums">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{aquarium.name}</h1>
            <p className="text-muted-foreground">ID: {aquarium.id}</p>
          </div>
        </div>

        {/* Panels */}
        <StatusPanel aquarium={aquarium} />
        <ChartsPanel />
        <ControlPanel
          pumpEnabled={pumpEnabled}
          setPumpEnabled={setPumpEnabled}
          filterEnabled={filterEnabled}
          setFilterEnabled={setFilterEnabled}
          automationEnabled={automationEnabled}
          setAutomationEnabled={setAutomationEnabled}
          handleFeedFish={handleFeedFish}
        />
        <AlertsPanel recentAlerts={recentAlerts} />
      </div>
    </div>
  );
};

export default ControlPage;
