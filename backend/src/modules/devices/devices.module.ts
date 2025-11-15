import { Module } from "@nestjs/common"
import { DevicesService } from "./devices.service"
import { DevicesController } from "./devices.controller"
import { DevicesGateway } from "./devices.gateway"
import { MqttModule } from "../mqtt/mqtt.module"

@Module({
  imports: [MqttModule],
  controllers: [DevicesController],
  providers: [DevicesService, DevicesGateway],
  exports: [DevicesService],
})
export class DevicesModule {}
