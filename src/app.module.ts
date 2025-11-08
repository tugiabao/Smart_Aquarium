import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DevicesModule } from "./modules/devices/devices.module"
import { SensorsModule } from "./modules/sensors/sensors.module"
import { MqttModule } from "./modules/mqtt/mqtt.module"
import { UsersModule } from "./modules/users/users.module"
import { AuthModule } from "./modules/auth/auth.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    AuthModule,
    UsersModule,
    DevicesModule,
    SensorsModule,
    MqttModule,
  ],
})
export class AppModule {}
