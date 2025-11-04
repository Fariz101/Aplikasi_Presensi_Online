import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async getMonthlySummary(user_id: number, monthYear: string) {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const [monthStr, yearStr] = monthYear.split('-');
    const month = parseInt(monthStr);
    const year = parseInt(yearStr);

    if (!month || !year || month < 1 || month > 12) {
      throw new NotFoundException('Format bulan tidak valid, harus MM-YYYY');
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const attendanceData = await this.prisma.attendance.groupBy({
      by: ['status'],
      where: {
        user_id,
        date: {
          gte: startDate,
          lt: endDate,
        }
      },
      _count: {
        status: true,
      }
    });
    const summary = {
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpa: 0,
    };

    attendanceData.forEach(item => {
      const status = item.status.toLowerCase();
      if (summary.hasOwnProperty(status)) {
        summary[status] = item._count.status;
      }
    });

    return {
      status: 'success',
      data: {
        user_id,
        month: monthYear,
        attendance_summary: summary,
      },
    };
  }



  async create(data: CreateAttendanceDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.user_id },
    });
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const attendance = await this.prisma.attendance.create({
      data: {
        user_id: data.user_id,
        date: new Date(data.date),
        time: data.time,
        status: data.status,
      },
      select: {
          attendance_id: true,
          user_id: true,
          date: true,
          time: true,
          status: true,
        },
    });

    return {
      status: 'success',
      message: 'Presensi berhasil dicatat',
      data: attendance,
    };
  }

  async getHistory(user_id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const attendances = await this.prisma.attendance.findMany({
      where: { user_id },
      orderBy: { date: 'desc' },
      select: {
          attendance_id: true,
          date: true,
          time: true,
          status: true,
        },
    });

    return {
      status: 'success',
      data: attendances,
    };
  }
}
