import { Controller, Get, Query } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get()
  async findAll() {
    return await this.staffService.findAll();
  }

  @Get('sql')
  async findAll2() {
    return await this.staffService.findAllSql();
  }

  @Get('paginate')
  async findAllWithPaginate(@Query() query: any) {
    const staff = await this.staffService.findAllWithPagination(query);
    const total = await this.staffService.getTotal();
    return {
      total: total,
      staff: staff,
    };
  }
}
