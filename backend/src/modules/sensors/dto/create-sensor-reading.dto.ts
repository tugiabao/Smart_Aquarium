import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateSensorReadingDto {
  @IsString()
  @IsNotEmpty()
  device_id!: string

  @IsNumber()
  @IsNotEmpty()
  temperature!: number

  @IsNumber()
  @IsNotEmpty()
  ph_level!: number

  @IsNumber()
  @IsNotEmpty()
  turbidity!: number

  @IsNumber()
  @IsNotEmpty()
  dissolved_oxygen!: number

  @IsNumber()
  @IsOptional()
  ammonia?: number

  @IsNumber()
  @IsOptional()
  nitrite?: number
}
