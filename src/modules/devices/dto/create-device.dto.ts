import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator"

export enum DeviceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ERROR = "error",
}

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceId!: string

  @IsString()
  @IsNotEmpty()
  deviceName!: string

  @IsString()
  @IsOptional()
  location?: string

  @IsEnum(DeviceStatus)
  @IsOptional()
  status?: DeviceStatus = DeviceStatus.INACTIVE

  @IsString()
  @IsOptional()
  userId?: string
}
