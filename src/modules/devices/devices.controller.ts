import { Controller, Get, Post, Put, Delete, UseGuards } from "@nestjs/common"
import { DevicesService } from "./devices.service"
import { CreateDeviceDto } from "./dto/create-device.dto"
import { MqttService } from "../mqtt/mqtt.service"
import { AuthGuard } from "../../common/guards/auth.guard"

@Controller("api/devices")
@UseGuards(AuthGuard)
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly mqttService: MqttService,
  ) {}

  @Post()
  async createDevice(body: CreateDeviceDto) {
    return this.devicesService.createDevice(body)
  }

  @Get()
  async getAllDevices() {
    return this.devicesService.getAllDevices()
  }

  @Get(":id")
  async getDeviceById(params: { id: string }) {
    return this.devicesService.getDeviceById(params.id)
  }

  @Get(":id/full")
  async getDeviceWithReadings(params: { id: string }) {
    return this.devicesService.getDeviceWithLatestReadings(params.id)
  }

  @Put(":id")
  async updateDevice(params: { id: string }, body: Record<string, unknown>) {
    return this.devicesService.updateDevice(params.id, body)
  }

  @Delete(":id")
  async deleteDevice(params: { id: string }) {
    return this.devicesService.deleteDevice(params.id)
  }

  @Post(":id/command")
  async sendCommandToDevice(params: { id: string }, body: { action: string; value?: unknown }) {
    const device = await this.devicesService.getDeviceById(params.id)
    this.mqttService.publish(`aquarium/${device.device_id}/command`, body)
    return { success: true, message: "Command sent" }
  }
}
