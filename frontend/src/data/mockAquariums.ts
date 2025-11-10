export interface Aquarium {
  id: string;
  name: string;
  status: "active" | "warning";
  temperature: number;
  waterLevel: number;
  lastUpdate: string;
}

export const mockAquariums: Aquarium[] = [
  {
    id: "AQ001",
    name: "Hồ Cá Cảnh Phòng Khách",
    status: "active",
    temperature: 26.5,
    waterLevel: 85,
    lastUpdate: "2 phút trước",
  },
  {
    id: "AQ002",
    name: "Hồ Cá Koi Sân Vườn",
    status: "warning",
    temperature: 31.2,
    waterLevel: 65,
    lastUpdate: "5 phút trước",
  },
  {
    id: "AQ003",
    name: "Hồ Cá Nhiệt Đới",
    status: "active",
    temperature: 27.8,
    waterLevel: 90,
    lastUpdate: "1 phút trước",
  },
  {
    id: "AQ004",
    name: "Hồ Cá Rồng",
    status: "warning",
    temperature: 29.5,
    waterLevel: 55,
    lastUpdate: "10 phút trước",
  },
];
