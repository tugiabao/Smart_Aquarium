import { WebSocketGateway, WebSocketServer, SubscribeMessage } from "@nestjs/websockets"
import type { Server } from "socket.io"
import { DevicesService } from "./devices.service"

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class DevicesGateway {
  @WebSocketServer()
  server!: Server

  constructor(private devicesService: DevicesService) {}

  @SubscribeMessage("device_status_update")
  async handleDeviceStatusUpdate(data: { deviceId: string; status: string }) {
    await this.devicesService.updateDevice(data.deviceId, { status: data.status })
    this.server.emit("device_updated", data)
  }

  broadcastDeviceUpdate(deviceId: string, updateData: any) {
    this.server.emit("device_changed", { deviceId, ...updateData })
  }
}
