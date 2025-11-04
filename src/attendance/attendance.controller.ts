import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get('history/:user_id')
  async history(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.attendanceService.getHistory(user_id);
  }

  @Get('summary/:user_id')
  async getSummary(
    @Param('user_id') user_id: string,
  ) {
    const now = new Date();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
    const monthYear = `${month}-${year}`;
    return this.attendanceService.getMonthlySummary(parseInt(user_id), monthYear);
  }
}
