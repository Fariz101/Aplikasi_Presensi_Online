import { Status } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}:\d{2}$/)
  time: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
