import { Controller, Get, Post, Param, Query } from "@nestjs/common"
import { SensorsService } from "./sensors.service"
import { CreateSensorReadingDto } from "./dto/create-sensor-reading.dto"

@Controller("api/sensors")
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post("reading")
  async saveSensorReading(createSensorReadingDto: CreateSensorReadingDto) {
    return this.sensorsService.saveSensorReading(createSensorReadingDto)
  }

  @Get(":deviceId/readings")
  async getSensorReadings(@Param('deviceId') deviceId: string, @Query('limit') limit?: number) {
    return this.sensorsService.getSensorReadings(deviceId, limit)
  }

  @Get(':deviceId/latest')
  async getLatestReading(@Param('deviceId') deviceId: string) {
    return this.sensorsService.getLatestReading(deviceId);
  }

  @Get(":deviceId/range")
  async getReadingsByTimeRange(
    @Param('deviceId') deviceId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.sensorsService.getReadingsByTimeRange(deviceId, new Date(startTime), new Date(endTime))
  }

  @Get(":deviceId/statistics")
  async getSensorStatistics(@Param('deviceId') deviceId: string, @Query('hours') hours: number = 24) {
    return this.sensorsService.getSensorStatistics(deviceId, hours)
  }
}
