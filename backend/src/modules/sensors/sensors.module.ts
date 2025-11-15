import { Module } from "@nestjs/common"
import { SensorsService } from "./sensors.service"
import { SensorsController } from "./sensors.controller"
import { MqttModule } from "../mqtt/mqtt.module"

@Module({
  imports: [MqttModule],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
