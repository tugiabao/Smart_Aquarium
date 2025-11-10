import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface Props {
  pumpEnabled: boolean;
  setPumpEnabled: (v: boolean) => void;
  filterEnabled: boolean;
  setFilterEnabled: (v: boolean) => void;
  automationEnabled: boolean;
  setAutomationEnabled: (v: boolean) => void;
  handleFeedFish: () => void;
}

const ControlPanel = ({
  pumpEnabled,
  setPumpEnabled,
  filterEnabled,
  setFilterEnabled,
  automationEnabled,
  setAutomationEnabled,
  handleFeedFish,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bảng điều khiển</CardTitle>
        <CardDescription>Quản lý các thiết bị trong hồ cá</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Bơm nước", enabled: pumpEnabled, setEnabled: setPumpEnabled },
          { label: "Hệ thống lọc nước", enabled: filterEnabled, setEnabled: setFilterEnabled },
          { label: "Chế độ tự động hóa", enabled: automationEnabled, setEnabled: setAutomationEnabled },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold">{item.label}</p>
              <p className="text-sm text-muted-foreground">
                {item.enabled ? "Đang hoạt động" : "Đã tắt"}
              </p>
            </div>
            <Switch checked={item.enabled} onCheckedChange={item.setEnabled} />
          </div>
        ))}

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-semibold">Servo cho ăn</p>
            <p className="text-sm text-muted-foreground">Kích hoạt thủ công</p>
          </div>
          <Button onClick={handleFeedFish}>Cho ăn</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
