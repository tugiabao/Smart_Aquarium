import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Clock } from "lucide-react";

interface AlertType {
  id: number;
  message: string;
  time: string;
  type: string; //"warning" | "default"
}

interface Props {
  recentAlerts: AlertType[];
}

const AlertsPanel = ({ recentAlerts }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Cảnh báo gần đây
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Cảnh báo</AlertTitle>
              <AlertDescription>
                {alert.message} - {alert.time}
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">Không có cảnh báo nào</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
