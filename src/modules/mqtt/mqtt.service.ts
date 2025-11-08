import { Injectable, Logger } from "@nestjs/common"
import * as mqtt from "mqtt"

@Injectable()
export class MqttService {
  private client!: mqtt.MqttClient
  private readonly logger = new Logger(MqttService.name)
  private callbacks: Map<string, (data: any) => void> = new Map()

  async connect() {
    const brokerUrl = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883"

    this.client = mqtt.connect(brokerUrl, {
      clientId: `aquarium-backend-${Date.now()}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    })

    this.client.on("connect", () => {
      this.logger.log("Connected to MQTT broker")
      this.subscribe("aquarium/+/data")
    })

    this.client.on("message", (topic, message) => {
      this.handleMessage(topic, message)
    })

    this.client.on("error", (error) => {
      this.logger.error(`MQTT error: ${error}`)
    })

    this.client.on("disconnect", () => {
      this.logger.warn("Disconnected from MQTT broker")
    })
  }

  subscribe(topic: string) {
    this.client.subscribe(topic, (error) => {
      if (error) {
        this.logger.error(`Failed to subscribe to ${topic}: ${error}`)
      } else {
        this.logger.log(`Subscribed to ${topic}`)
      }
    })
  }

  publish(topic: string, message: any) {
    this.client.publish(topic, JSON.stringify(message), { qos: 1 })
    this.logger.log(`Published to ${topic}: ${JSON.stringify(message)}`)
  }

  private handleMessage(topic: string, message: Buffer) {
    try {
      const data = JSON.parse(message.toString())
      this.logger.debug(`Received message from ${topic}: ${JSON.stringify(data)}`)

      const callback = this.callbacks.get(topic)
      if (callback) {
        callback(data)
      }
    } catch (error) {
      this.logger.error(`Failed to parse MQTT message: ${error}`)
    }
  }

  registerCallback(topic: string, callback: (data: any) => void) {
    this.callbacks.set(topic, callback)
  }

  disconnect() {
    if (this.client) {
      this.client.end()
      this.logger.log("Disconnected from MQTT broker")
    }
  }
}
