# Smart Aquarium Management System

A comprehensive IoT solution for managing smart aquariums using NestJS, Supabase, MQTT/EMQX, and ESP32.

## Architecture

- **Backend**: NestJS with TypeScript
- **Database**: Supabase (PostgreSQL)
- **IoT Communication**: MQTT (EMQX Broker)
- **Real-time Updates**: WebSocket (Socket.IO)
- **Firmware**: Arduino C++ for ESP32 NodeMCU-32S

## Prerequisites

- Node.js 18+
- Docker & Docker Compose (for EMQX and Supabase)
- Supabase account or self-hosted instance
- ESP32 development environment (Arduino IDE or PlatformIO)

## Installation

### 1. Setup Backend

\`\`\`bash
npm install
cp .env.example .env
# Fill in your Supabase and MQTT credentials
\`\`\`

### 2. Initialize Database

\`\`\`bash
npm run start:dev
# Run the SQL script from scripts/init-database.sql in Supabase dashboard
\`\`\`

### 3. Start MQTT Broker (EMQX)

\`\`\`bash
docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:latest
\`\`\`

### 4. ESP32 Firmware

Upload `firmware/esp32-aquarium.ino` to your NodeMCU-32S using Arduino IDE:
- Update WiFi credentials
- Update MQTT broker IP address
- Connect sensors to analog pins as defined in the sketch

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Devices

- `GET /api/devices` - Get all devices
- `POST /api/devices` - Create new device
- `GET /api/devices/:id` - Get device by ID
- `GET /api/devices/:id/full` - Get device with latest readings
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Delete device
- `POST /api/devices/:id/command` - Send command to device

### Sensors

- `POST /api/sensors/reading` - Save sensor reading
- `GET /api/sensors/:deviceId/readings` - Get sensor readings
- `GET /api/sensors/:deviceId/latest` - Get latest reading
- `GET /api/sensors/:deviceId/range` - Get readings by time range
- `GET /api/sensors/:deviceId/statistics` - Get sensor statistics

## MQTT Topics

### Device to Server

- `aquarium/{deviceId}/data` - Sensor data
- `aquarium/{deviceId}/status` - Device status

### Server to Device

- `aquarium/{deviceId}/command` - Commands (restart, status, etc.)

## WebSocket Events

- `subscribe_device` - Subscribe to device updates
- `unsubscribe_device` - Unsubscribe from device updates
- `sensor_data` - Real-time sensor data
- `device_status` - Device status updates

## Database Schema

### users
- id (UUID)
- email (VARCHAR)
- username (VARCHAR)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### devices
- id (UUID)
- device_id (VARCHAR)
- device_name (VARCHAR)
- location (VARCHAR)
- status (VARCHAR)
- user_id (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### sensor_readings
- id (UUID)
- device_id (UUID)
- temperature (DECIMAL)
- ph_level (DECIMAL)
- turbidity (DECIMAL)
- dissolved_oxygen (DECIMAL)
- ammonia (DECIMAL)
- nitrite (DECIMAL)
- created_at (TIMESTAMP)

## Environment Variables

\`\`\`
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=aquarium_user
MQTT_PASSWORD=your_password
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
\`\`\`

## Development

\`\`\`bash
npm run start:dev
\`\`\`

## Production Build

\`\`\`bash
npm run build
npm run start:prod
\`\`\`

## License

MIT
