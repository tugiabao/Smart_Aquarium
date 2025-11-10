import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  type OnGatewayInit,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import { MqttService } from "./mqtt.service"

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class MqttGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server

  constructor(private mqttService: MqttService) {}

  afterInit(server: Server) {
    console.log("WebSocket Gateway initialized")
    this.setupMqttCallbacks()
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage("subscribe_device")
  handleSubscribeDevice(client: Socket, data: { deviceId: string }) {
    const topic = `aquarium/${data.deviceId}/data`
    client.join(topic)
    console.log(`Client subscribed to ${topic}`)
  }

  @SubscribeMessage("unsubscribe_device")
  handleUnsubscribeDevice(client: Socket, data: { deviceId: string }) {
    const topic = `aquarium/${data.deviceId}/data`
    client.leave(topic)
    console.log(`Client unsubscribed from ${topic}`)
  }

  private setupMqttCallbacks() {
    this.mqttService.registerCallback("aquarium/+/data", (data) => {
      this.server.emit("sensor_data", data)
    })

    this.mqttService.registerCallback("aquarium/+/status", (data) => {
      this.server.emit("device_status", data)
    })
  }

  broadcastSensorData(deviceId: string, data: any) {
    this.server.to(`aquarium/${deviceId}/data`).emit("sensor_update", data)
  }
}
