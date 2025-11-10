import { Injectable } from "@nestjs/common"
import { supabase } from "../../config/supabase.config"
import type { CreateSensorReadingDto } from "./dto/create-sensor-reading.dto"
import { MqttService } from "../mqtt/mqtt.service"

@Injectable()
export class SensorsService {
  constructor(private mqttService: MqttService) { }

  async saveSensorReading(createSensorReadingDto: CreateSensorReadingDto) {
    const { data, error } = await supabase.from("sensor_readings").insert([createSensorReadingDto]).select()

    if (error) throw new Error(`Failed to save sensor reading: ${error.message}`)

    const reading = data[0]
    this.mqttService.publish(`aquarium/${createSensorReadingDto.device_id}/reading`, reading)

    return reading
  }

  async getSensorReadings(deviceId: string, limit = 100) {
    const { data, error } = await supabase
      .from("sensor_readings")
      .select("*")
      .eq("device_id", deviceId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw new Error(`Failed to fetch sensor readings: ${error.message}`)
    return data
  }

  async getLatestReading(deviceId: string) {
    const { data, error } = await supabase
      .from("sensor_readings")
      .select("*")
      .eq("device_id", deviceId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) throw new Error(`Failed to fetch latest reading: ${error.message}`)
    return data
  }

  async getReadingsByTimeRange(deviceId: string, startTime: Date, endTime: Date) {
    const { data, error } = await supabase
      .from("sensor_readings")
      .select("*")
      .eq("device_id", deviceId)
      .gte("created_at", startTime.toISOString())
      .lte("created_at", endTime.toISOString())
      .order("created_at", { ascending: false })

    if (error) throw new Error(`Failed to fetch readings: ${error.message}`)
    return data
  }

  async getSensorStatistics(deviceId: string, hours = 24) {
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000)
    const readings = await this.getReadingsByTimeRange(deviceId, startTime, new Date())

    if (!readings || readings.length === 0) {
      return null
    }

    const stats = {
      temperature: {
        avg: 0,
        min: 0,
        max: 0,
      },
      ph_level: {
        avg: 0,
        min: 0,
        max: 0,
      },
      dissolved_oxygen: {
        avg: 0,
        min: 0,
        max: 0,
      },
      turbidity: {
        avg: 0,
        min: 0,
        max: 0,
      },
    }

    // Calculate statistics
    type SensorKey = keyof typeof stats; // 'temperature' | 'ph_level' | ...

    Object.keys(stats).forEach((rawKey) => {
      const key = rawKey as SensorKey; // ép kiểu an toàn

      const values = readings
        .map((r) => r[key])
        .filter((v): v is number => v !== null && v !== undefined);

      if (values.length > 0) {
        stats[key].avg = values.reduce((a, b) => a + b, 0) / values.length;
        stats[key].min = Math.min(...values);
        stats[key].max = Math.max(...values);
      }
    });

    return stats
  }
}
