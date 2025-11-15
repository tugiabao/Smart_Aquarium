import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Thermometer, Droplets, Users, ArrowLeft } from "lucide-react";

const AquariumSettingsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [minTemp, setMinTemp] = useState(25);
  const [maxTemp, setMaxTemp] = useState(30);
  const [minWaterLevel, setMinWaterLevel] = useState(60);
  const [autoFeedEnabled, setAutoFeedEnabled] = useState(false);
  const [autoFilterEnabled, setAutoFilterEnabled] = useState(true);
  const [subUsers, setSubUsers] = useState(["user1@gmail.com"]);

  const handleAddSubUser = () => {
    const email = prompt("Nhập email người được cấp quyền:");
    if (email) setSubUsers([...subUsers, email]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/aquariums">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cài đặt hồ cá</h1>
            <p className="text-muted-foreground">ID hồ: {id}</p>
          </div>
        </div>

        {/* Threshold Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Cấu hình ngưỡng nhiệt độ & mực nước
            </CardTitle>
            <CardDescription>Thiết lập các giới hạn cảnh báo</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minTemp">Nhiệt độ tối thiểu (°C)</Label>
              <Input
                id="minTemp"
                type="number"
                value={minTemp}
                onChange={(e) => setMinTemp(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="maxTemp">Nhiệt độ tối đa (°C)</Label>
              <Input
                id="maxTemp"
                type="number"
                value={maxTemp}
                onChange={(e) => setMaxTemp(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="minWater">Mực nước tối thiểu (%)</Label>
              <Input
                id="minWater"
                type="number"
                value={minWaterLevel}
                onChange={(e) => setMinWaterLevel(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Automation Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Lịch tự động
            </CardTitle>
            <CardDescription>Bật/tắt chế độ cho ăn và lọc nước tự động</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <p>Cho ăn tự động</p>
              <Switch checked={autoFeedEnabled} onCheckedChange={setAutoFeedEnabled} />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <p>Lọc nước tự động</p>
              <Switch checked={autoFilterEnabled} onCheckedChange={setAutoFilterEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Access Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quản lý quyền truy cập
            </CardTitle>
            <CardDescription>Thêm người được phép truy cập hồ cá</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 mb-4">
              {subUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
            <Button variant="outline" onClick={handleAddSubUser}>+ Thêm người dùng</Button>
          </CardContent>
        </Card>

        <div className="text-right">
          <Button className="bg-primary text-white hover:bg-primary/90">Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
};

export default AquariumSettingsPage;
