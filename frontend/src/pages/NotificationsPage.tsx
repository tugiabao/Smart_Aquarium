import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Mail, MessageSquare, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type Notification = {
  id: number;
  message: string;
  time: string;
  type: "warning" | "info";
};

const NotificationsPage = () => {
  const [notifications] = useState<Notification[]>([
    { id: 1, message: "Nhiệt độ cao lúc 14:00", time: "14:00", type: "warning" },
    { id: 2, message: "Mực nước thấp lúc 10:30", time: "10:30", type: "warning" },
    { id: 3, message: "Hệ thống lọc hoạt động bình thường", time: "09:00", type: "info" },
  ]);

  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/aquariums">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Thông báo</h1>
            <p className="text-muted-foreground">Xem và cấu hình nhận thông báo</p>
          </div>
        </div>

        {/* Notification list */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Danh sách thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border rounded-lg flex items-center justify-between ${
                  n.type === "warning" ? "border-destructive/40 bg-destructive/10" : "border-border bg-muted/20"
                }`}
              >
                <span>{n.message}</span>
                <span className="text-sm text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thông báo</CardTitle>
            <CardDescription>Chọn phương thức nhận cảnh báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <p>Email</p>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <p>SMS</p>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
            </div>

            <div className="text-right">
              <Button className="bg-primary text-white hover:bg-primary/90">Lưu cài đặt</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
