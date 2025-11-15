import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, AlertTriangle } from "lucide-react";

interface Props {
  aquarium: { temperature: number; waterLevel: number };
}

const StatusPanel = ({ aquarium }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            Nhiệt độ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            <span className={aquarium.temperature > 30 ? "text-destructive" : "text-primary"}>
              {aquarium.temperature}°C
            </span>
          </div>
          {aquarium.temperature > 30 && (
            <p className="text-sm text-destructive mt-2 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Vượt ngưỡng an toàn
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Mực nước
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            <span className={aquarium.waterLevel < 60 ? "text-destructive" : "text-primary"}>
              {aquarium.waterLevel}%
            </span>
          </div>
          {aquarium.waterLevel < 60 && (
            <p className="text-sm text-destructive mt-2 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Mực nước thấp
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPanel;
