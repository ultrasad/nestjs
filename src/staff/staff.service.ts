import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllWithPagination(query: any): Promise<Staff[]> {
    const { page, limit } = query;
    const myPage = page ? Number(page) : 1;
    const myPageSize = page ? Number(limit) : 3;
    const staff = await this.prismaService.staff.findMany({
      skip: (myPage - 1) * myPageSize,
      take: myPageSize,
      include: { Position: true },
      //include: { User: true },
      orderBy: { id: 'desc' },
    });
    return staff;
  }

  async getTotal(): Promise<number> {
    return await this.prismaService.staff.count();
  }

  async findAll(): Promise<Staff[]> {
    const staff = await this.prismaService.staff.findMany({
      //include: { Position: true },
      //include: { User: true },
      orderBy: { id: 'desc' },
    });
    return staff;
  }

  async findAll2(): Promise<any> {
    const staff = await this.prismaService.staff.findMany({
      select: {
        id: true,
        fullname: true,
        Position: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
    return staff;
  }

  async findAll3(): Promise<any> {
    const staff = await this.prismaService.staff.findMany({
      select: {
        id: true,
        fullname: true,
        Position: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
    return staff;
  }

  async findAllSql(): Promise<Staff[]> {
    const staff = await this.prismaService.$queryRaw('SELECT * FROM "Staff"');
    return staff;
  }
}
