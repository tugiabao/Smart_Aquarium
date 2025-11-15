# Smart Aquarium System - Complete Deployment & Execution Guide

## 📋 Overview

Hệ thống gồm 4 thành phần chính:
1. **Backend NestJS** - API và MQTT gateway
2. **Supabase** - Database PostgreSQL
3. **EMQX** - MQTT Broker
4. **ESP32** - Thiết bị IoT

---

## 🚀 PHASE 1: Chuẩn bị môi trường

### 1.1 Cài đặt Node.js
\`\`\`bash
# Windows/Mac: Tải từ https://nodejs.org/ (LTS version)
# Linux:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

### 1.2 Cài đặt pnpm
\`\`\`bash
# Cài toàn cầu
npm install -g pnpm

# Hoặc cài phiên bản cụ thể
npm install -g pnpm@9

# Kiểm tra version
pnpm --version
\`\`\`

### 1.3 Clone hoặc tải project
\`\`\`bash
cd smart-aquarium-backend
pnpm install
\`\`\`

### 1.4 Chuẩn bị file cấu hình
\`\`\`bash
cp .env.example .env
\`\`\`

Bạn sẽ cập nhật `.env` trong các bước tiếp theo.

---

## 🔐 PHASE 2: Thiết lập Supabase (Database)

### 2.1 Tạo Supabase Project
1. Truy cập https://supabase.com
2. Đăng ký / Đăng nhập
3. Click **New Project**
4. Nhập thông tin:
   - Name: `smart-aquarium`
   - Database Password: `YourSecurePassword123` (lưu giữ)
   - Region: Chọn gần nhất với bạn
5. Chờ project khởi tạo (~2 phút)

### 2.2 Lấy credentials
1. Vào **Project Settings** (icon bánh răng)
2. Tab **API**
3. Copy và lưu:
   - `Project URL` → `SUPABASE_URL` trong `.env`
   - `anon public` key → `SUPABASE_ANON_KEY` trong `.env`

### 2.3 Tạo database tables
1. Vào **SQL Editor** trong Supabase
2. Click **New Query**
3. Copy toàn bộ code từ `scripts/init-database.sql`
4. Paste vào SQL Editor
5. Click **Run**

**Kết quả:** Sẽ tạo 3 bảng: `users`, `devices`, `sensor_readings`

### 2.4 Bật Row Level Security (RLS)
1. Vào **Authentication** → **Policies**
2. Cho mỗi bảng (users, devices, sensor_readings):
   - Chọn bảng
   - Bật **Enable RLS**
   - Click **New Policy** và chọn template phù hợp

---

## 🌐 PHASE 3: Thiết lập EMQX (MQTT Broker)

### 3.1 Cài EMQX trên máy local (Recommended)

#### Windows:
1. Tải từ https://www.emqx.io/downloads
2. Chọn **EMQX Installer**
3. Cài đặt theo wizard
4. EMQX Dashboard sẽ tự động mở tại http://localhost:18083

#### Mac (Homebrew):
\`\`\`bash
brew install emqx
brew services start emqx
# Dashboard: http://localhost:18083
\`\`\`

#### Linux (Ubuntu/Debian):
\`\`\`bash
curl https://www.emqx.io/downloads/broker/releases/emqx-5.0.0-ubuntu20.04-amd64.tar.gz | tar xz
cd emqx
./bin/emqx start
# Dashboard: http://localhost:18083
\`\`\`

### 3.2 Cấu hình EMQX User
1. Truy cập EMQX Dashboard: http://localhost:18083
2. Đăng nhập: 
   - Username: `admin`
   - Password: `public`
3. Vào **Access Control** → **Users**
4. Click **Create User**
5. Nhập:
   - Username: `aquarium_user`
   - Password: `password123`
   - Confirm Password: `password123`
6. Click **Create**

### 3.3 Cấu hình MQTT Permission
1. Vào **Access Control** → **ACL**
2. Click **Create ACL**
3. Nhập:
   - Username: `aquarium_user`
   - Action: **Publish** + **Subscribe**
   - Topic: `aquarium/#` (wildcard)
4. Click **Create**

### 3.4 Cập nhật .env
\`\`\`bash
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=aquarium_user
MQTT_PASSWORD=password123
\`\`\`

---

## ⚙️ PHASE 4: Chạy Backend NestJS

### 4.1 Cập nhật .env đầy đủ
\`\`\`bash
# File: .env

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...

# MQTT
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=aquarium_user
MQTT_PASSWORD=password123

# Server
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
\`\`\`

### 4.2 Chạy development server
\`\`\`bash
pnpm start:dev
\`\`\`

**Output khi thành công:**
\`\`\`
[Nest] 12345  - 11/08/2025, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 11/08/2025, 10:30:01 AM     LOG [InstanceLoader] MqttModule dependencies initialized
[Nest] 12345  - 11/08/2025, 10:30:02 AM     LOG [NestApplication] Nest application successfully started
Listening on port 3000
\`\`\`

### 4.3 Test API
\`\`\`bash
# Terminal mới - Test đăng ký
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@aquarium.local",
    "password": "admin123",
    "username": "admin"
  }'

# Sẽ nhận token từ response
\`\`\`

---

## 📱 PHASE 5: Upload Firmware ESP32

### 5.1 Cài Arduino IDE
1. Tải từ https://www.arduino.cc/en/software
2. Cài đặt bình thường

### 5.2 Cài Board Support ESP32
1. Mở Arduino IDE
2. **File** → **Preferences**
3. **Additional Boards Manager URLs**, paste:
   \`\`\`
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
4. **Tools** → **Board Manager**
5. Search: `esp32`
6. Click **Install** (chọn version mới nhất)

### 5.3 Cài thư viện cần thiết
1. **Sketch** → **Include Library** → **Manage Libraries**
2. Cài từng thư viện:
   - `ArduinoJson` by Benoit Blanchon (version 6.x)
   - `PubSubClient` by Nick O'Leary (version 2.8)
3. Mỗi thư viện: search → **Install**

### 5.4 Cấu hình Firmware
1. Mở file: `esp32-firmware/aquarium-firmware.ino`
2. Cập nhật:

\`\`\`cpp
// WiFi config
const char* ssid = "YOUR_WIFI_SSID";              // ← Đổi WiFi bạn dùng
const char* password = "YOUR_WIFI_PASSWORD";      // ← Đổi password WiFi

// MQTT config
const char* mqtt_server = "192.168.x.x";          // ← IP máy chạy EMQX
const int mqtt_port = 1883;
const char* mqtt_user = "aquarium_user";
const char* mqtt_pass = "password123";

// Device ID (phải unique)
const char* device_id = "ESP32_001";
\`\`\`

### 5.5 Kết nối ESP32
1. Kết nối **NodeMCU-32S** với máy tính qua USB-C
2. Mở Arduino IDE
3. **Tools** → **Board** → **ESP32 Dev Module**
4. **Tools** → **Port** → Chọn COM port (ví dụ: COM3)
5. Kiểm tra **Tools** → **Upload Speed** = **921600**

### 5.6 Upload firmware
1. Copy toàn bộ code từ `esp32-firmware/aquarium-firmware.ino`
2. Paste vào Arduino IDE
3. Click nút **Upload** (mũi tên →)
4. Chờ upload xong (~30 giây)

**Khi thành công:**
\`\`\`
Leaving...
Hard resetting via RTS pin...
\`\`\`

### 5.7 Kết nối Cảm Biến
\`\`\`
Temperature (DS18B20) → GPIO 4
pH Sensor (Analog)    → GPIO 35
Turbidity (Analog)    → GPIO 32
Dissolved O2 (Analog) → GPIO 33
Relay Control         → GPIO 27
Servo (Pump Control)  → GPIO 26

GND → GND
VCC (3.3V) → 3V3 hoặc GND (tùy cảm biến)
\`\`\`

### 5.8 Kiểm tra Serial Monitor
1. **Tools** → **Serial Monitor**
2. Baudrate: **115200**
3. Bạn sẽ thấy:
   \`\`\`
   Connecting to WiFi: MY_SSID
   WiFi connected!
   Connecting to MQTT...
   MQTT connected!
   Publishing sensor data...
   \`\`\`

---

## ✅ PHASE 6: Kiểm tra hệ thống

### 6.1 Kiểm tra Backend API
\`\`\`bash
# Đăng nhập
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aquarium.local","password":"admin123"}'

# Sẽ nhận: {"access_token":"eyJ...","user":{"id":"...","email":"..."}}
# Lưu access_token
\`\`\`

### 6.2 Tạo thiết bị (Device)
\`\`\`bash
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "device_id":"ESP32_001",
    "device_name":"Main Aquarium",
    "location":"Living Room"
  }'
\`\`\`

### 6.3 Monitor MQTT Topics
**Option A: Dùng EMQX Dashboard**
1. Vào EMQX Dashboard: http://localhost:18083
2. **Tools** → **MQTT WebSocket Client**
3. Subscribe topic: `aquarium/#`
4. Bạn sẽ thấy dữ liệu từ ESP32:
\`\`\`json
{
  "device_id": "ESP32_001",
  "temperature": 26.5,
  "ph": 7.2,
  "turbidity": 150,
  "dissolved_oxygen": 8.5
}
\`\`\`

**Option B: Dùng mosquitto_sub (Linux/Mac)**
\`\`\`bash
mosquitto_sub -h localhost -u aquarium_user -P password123 -t "aquarium/#"
\`\`\`

### 6.4 Kiểm tra Sensor Readings
\`\`\`bash
curl http://localhost:3000/api/sensors/ESP32_001/latest \
  -H "Authorization: Bearer YOUR_TOKEN"

# Response:
{
  "id":"...",
  "device_id":"ESP32_001",
  "temperature":26.5,
  "ph_level":7.2,
  "turbidity":150,
  "dissolved_oxygen":8.5,
  "created_at":"2025-11-08T10:30:00Z"
}
\`\`\`

---

## 🐛 Troubleshooting

### Backend không kết nối Supabase
\`\`\`bash
# Kiểm tra .env
cat .env | grep SUPABASE

# Test connection
pnpm start:dev

# Nếu lỗi: "Invalid API key"
# → Kiểm tra lại SUPABASE_URL và SUPABASE_ANON_KEY
\`\`\`

### ESP32 không upload
\`\`\`
Error: "Failed to open COM port"
→ Cắm lại USB, hoặc cài driver CH340 (tìm trên Google)

Error: "Brownout detector was triggered"
→ Cấp nguồn 5V thay vì 3.3V
\`\`\`

### MQTT không kết nối
\`\`\`bash
# Kiểm tra EMQX đang chạy
nc -zv localhost 1883

# Kiểm tra credentials
mosquitto_pub -h localhost -u aquarium_user -P password123 -t test -m "hello"
\`\`\`

### Không nhận dữ liệu từ ESP32
1. Kiểm tra Serial Monitor xem ESP32 kết nối WiFi không
2. Kiểm tra IP MQTT_BROKER_URL có đúng không
3. Monitor EMQX topic: `aquarium/ESP32_001/data`

---

## 📊 Các file quan trọng

| File | Mục đích |
|------|---------|
| `.env` | Biến môi trường (cấu hình) |
| `scripts/init-database.sql` | Khởi tạo database |
| `src/main.ts` | Entry point backend |
| `esp32-firmware/aquarium-firmware.ino` | Firmware ESP32 |
| `src/config/mqtt.config.ts` | Cấu hình MQTT |

---

## 🎯 Sau khi setup xong

✅ Backend chạy ở `http://localhost:3000` (dùng `pnpm start:dev`)
✅ EMQX chạy ở `http://localhost:18083`
✅ ESP32 gửi dữ liệu qua MQTT
✅ Supabase lưu trữ dữ liệu
✅ Dữ liệu sync real-time qua WebSocket

**Bước tiếp theo:** Xây dựng Frontend React/Vue để hiển thị dashboard
