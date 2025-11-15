import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Settings, Gauge, Droplets, ThermometerSun, AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockAquariums } from "@/data/mockAquariums";
import { Bell } from "lucide-react";
const AquariumListPage = () => {
    const navigate = useNavigate();

    const getStatusConfig = (status: string) => {
        if (status === "active") {
            return {
                label: "Hoạt động",
                variant: "default" as const,
                icon: CheckCircle2,
            };
        }
        return {
            label: "Cảnh báo",
            variant: "destructive" as const,
            icon: AlertTriangle,
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-ocean-100">
            {/* Header */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Quản Lý Hồ Cá</h1>
                            <p className="text-muted-foreground mt-1">Theo dõi và điều khiển các hồ cá của bạn</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => navigate("/notifications")}
                                title="Thông báo"
                            >
                                <Bell className="w-5 h-5" />
                            </Button >
                            <Button onClick={() => navigate("/")}>
                                Đăng xuất
                            </Button>
                        </div>

                    </div>
                </div>
            </header>

            {/* Aquarium Grid */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAquariums.map((aquarium) => {
                        const statusConfig = getStatusConfig(aquarium.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <Card key={aquarium.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl mb-2">{aquarium.name}</CardTitle>
                                            <CardDescription className="font-mono text-xs">ID: {aquarium.id}</CardDescription>
                                        </div>
                                        <Badge variant={statusConfig.variant} className="ml-2 flex items-center gap-1">
                                            <StatusIcon className="w-3 h-3" />
                                            {statusConfig.label}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                            <ThermometerSun className={`w-5 h-5 ${aquarium.temperature > 30 ? 'text-red-500' : 'text-ocean-600'}`} />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Nhiệt độ</p>
                                                <p className="text-lg font-semibold">{aquarium.temperature}°C</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                            <Droplets className={`w-5 h-5 ${aquarium.waterLevel < 60 ? 'text-red-500' : 'text-ocean-600'}`} />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Mực nước</p>
                                                <p className="text-lg font-semibold">{aquarium.waterLevel}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        Cập nhật: {aquarium.lastUpdate}
                                    </p>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <Button onClick={() => navigate(`/control/${aquarium.id}`)} className="w-full">
                                            <Gauge className="w-4 h-4 mr-2" />
                                            Điều khiển
                                        </Button>
                                        <Button
                                            onClick={() => navigate(`/settings/${aquarium.id}`)}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Cài đặt
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default AquariumListPage;
