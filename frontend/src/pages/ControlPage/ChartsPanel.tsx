import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const temperatureHistory = [
  { time: "00:00", temp: 26.5 },
  { time: "04:00", temp: 26.2 },
  { time: "08:00", temp: 27.8 },
  { time: "12:00", temp: 29.5 },
  { time: "16:00", temp: 31.2 },
  { time: "20:00", temp: 28.3 },
  { time: "23:59", temp: 27.1 },
];

const waterLevelHistory = [
  { time: "00:00", level: 85 },
  { time: "04:00", level: 83 },
  { time: "08:00", level: 80 },
  { time: "12:00", level: 78 },
  { time: "16:00", level: 75 },
  { time: "20:00", level: 73 },
  { time: "23:59", level: 70 },
];

const ChartsPanel = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử nhiệt độ (24h)</CardTitle>
          <CardDescription>Biểu đồ nhiệt độ theo giờ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={temperatureHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" name="Nhiệt độ (°C)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử mực nước (24h)</CardTitle>
          <CardDescription>Biểu đồ mực nước theo giờ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waterLevelHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="level" stroke="hsl(var(--accent))" name="Mực nước (%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsPanel;
