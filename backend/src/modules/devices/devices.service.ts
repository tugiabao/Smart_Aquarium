import { Injectable } from "@nestjs/common"
import { supabase } from "../../config/supabase.config"
import type { CreateDeviceDto } from "./dto/create-device.dto"
import { MqttService } from "../mqtt/mqtt.service"

@Injectable()
export class DevicesService {
  constructor(private mqttService: MqttService) {}

  async createDevice(createDeviceDto: CreateDeviceDto) {
    const { data, error } = await supabase.from("devices").insert([createDeviceDto]).select()

    if (error) throw new Error(`Failed to create device: ${error.message}`)

    const device = data[0]
    this.mqttService.subscribe(`aquarium/${device.device_id}/data`)
    this.mqttService.subscribe(`aquarium/${device.device_id}/status`)

    return device
  }

  async getAllDevices() {
    const { data, error } = await supabase.from("devices").select("*")

    if (error) throw new Error(`Failed to fetch devices: ${error.message}`)
    return data
  }

  async getDeviceById(deviceId: string) {
    const { data, error } = await supabase.from("devices").select("*").eq("id", deviceId).single()

    if (error) throw new Error(`Failed to fetch device: ${error.message}`)
    return data
  }

  async updateDevice(deviceId: string, updateData: any) {
    const { data, error } = await supabase.from("devices").update(updateData).eq("id", deviceId).select()

    if (error) throw new Error(`Failed to update device: ${error.message}`)
    return data[0]
  }

  async deleteDevice(deviceId: string) {
    const { error } = await supabase.from("devices").delete().eq("id", deviceId)

    if (error) throw new Error(`Failed to delete device: ${error.message}`)
    return { success: true }
  }

  async getDeviceWithLatestReadings(deviceId: string) {
    const { data: device, error: deviceError } = await supabase.from("devices").select("*").eq("id", deviceId).single()

    if (deviceError) throw new Error(`Failed to fetch device: ${deviceError.message}`)

    const { data: readings, error: readingsError } = await supabase
      .from("sensor_readings")
      .select("*")
      .eq("device_id", deviceId)
      .order("created_at", { ascending: false })
      .limit(10)

    if (readingsError) throw new Error(`Failed to fetch readings: ${readingsError.message}`)

    return { device, latestReadings: readings }
  }
}
