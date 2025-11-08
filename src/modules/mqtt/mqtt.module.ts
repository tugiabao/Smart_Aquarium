import { Module, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common"
import { MqttService } from "./mqtt.service"
import { MqttGateway } from "./mqtt-gateway"

@Module({
  providers: [MqttService, MqttGateway],
  exports: [MqttService, MqttGateway],
})
export class MqttModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly mqttService: MqttService) {}

  async onModuleInit() {
    await this.mqttService.connect()
  }

  onModuleDestroy() {
    this.mqttService.disconnect()
  }
}
