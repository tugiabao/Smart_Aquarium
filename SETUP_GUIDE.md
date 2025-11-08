# Smart Aquarium System - Complete Setup Guide

## Step 1: Backend Setup

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Configure Environment
\`\`\`bash
cp .env.example .env
\`\`\`

Update `.env` with your credentials:
\`\`\`
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
MQTT_BROKER_URL=mqtt://your-emqx-ip:1883
MQTT_USERNAME=aquarium_user
MQTT_PASSWORD=password123
\`\`\`

### Start Development Server
\`\`\`bash
npm run start:dev
\`\`\`

## Step 2: MQTT Broker Setup (EMQX)

### Option A: Install EMQX Locally (Windows/Mac/Linux)

1. Download EMQX from https://www.emqx.io/downloads
2. Install and start the service
3. Access Dashboard at http://localhost:18083
   - Default username: `admin`
   - Default password: `public`

### Option B: Use EMQX Cloud
1. Create account at https://www.emqx.com/en/cloud
2. Create a deployment
3. Get connection details (IP, port, credentials)
4. Update `MQTT_BROKER_URL` in `.env`

### Create MQTT User
In EMQX Dashboard:
1. Go to **Access Control** → **Users**
2. Create new user: `aquarium_user` with password `password123`
3. Set permissions for topic `aquarium/#`

## Step 3: Database Setup

### Setup Supabase
1. Create account at https://supabase.com
2. Create new project
3. Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
4. Update `.env` file

### Create Tables
In Supabase SQL Editor, run `scripts/init-database.sql`:
\`\`\`sql
-- ... run the SQL script from your project ...
\`\`\`

### Enable RLS (Row Level Security)
\`\`\`sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
\`\`\`

## Step 4: ESP32 Firmware

### Install Arduino IDE
1. Download from https://www.arduino.cc/en/software
2. Install the application

### Add ESP32 Board
1. Open Arduino IDE
2. Go to **File** → **Preferences**
3. Add to Additional Boards Manager URLs:
   \`\`\`
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
4. Go to **Tools** → **Board Manager**
5. Search for "esp32" and install

### Install Required Libraries
In Arduino IDE, go to **Sketch** → **Include Library** → **Manage Libraries**:
- ArduinoJson (by Benoit Blanchon)
- PubSubClient (by Nick O'Leary)

### Configure Firmware
Edit `esp32-aquarium.ino`:
\`\`\`cpp
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "YOUR_EMQX_IP_OR_HOSTNAME";
const int mqtt_port = 1883;
const char* mqtt_user = "aquarium_user";
const char* mqtt_pass = "password123";
\`\`\`

### Upload to ESP32
1. Connect NodeMCU-32S to computer via USB
2. Select **Tools** → **Board** → **ESP32 Dev Module**
3. Select correct **COM Port**
4. Click **Upload**

### Sensor Wiring
\`\`\`
Temperature Sensor (DS18B20) -> GPIO 4
pH Sensor (Analog)           -> GPIO 35 (ADC1_7)
Turbidity Sensor (Analog)    -> GPIO 32 (ADC1_4)
DO Sensor (Analog)           -> GPIO 33 (ADC1_5)
\`\`\`

## Step 5: Testing

### Test API Registration
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
\`\`\`

### Test Device Creation
\`\`\`bash
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "device_id": "ESP32_001",
    "device_name": "Main Aquarium",
    "location": "Living Room"
  }'
\`\`\`

### Monitor MQTT with mosquitto_sub (Linux/Mac)
\`\`\`bash
mosquitto_sub -h your-emqx-ip -u aquarium_user -P password123 -t "aquarium/#"
\`\`\`

Or use EMQX WebSocket tool in Dashboard.

## Troubleshooting

### ESP32 Not Connecting
- Verify WiFi SSID and password are correct
- Check MQTT broker IP/hostname is reachable
- Ensure NodeMCU-32S has latest USB driver installed
- Check Arduino IDE COM port selection

### No Sensor Data Received
- Verify sensor connections and ADC pins
- Check sensor calibration
- Monitor MQTT topic: `aquarium/ESP32_001/data`
- Check NestJS logs for errors

### MQTT Connection Refused
- Ensure EMQX is running
- Check credentials in `.env` match EMQX user settings
- Verify firewall allows port 1883
- Test connection: `mosquitto_pub -h your-ip -u aquarium_user -P password123 -t test -m "hello"`

### Supabase Connection Error
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check internet connection
- Ensure Supabase project is running
