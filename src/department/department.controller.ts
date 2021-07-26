import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // http://localhost:3000/v1/api/department
  @Get()
  index(): string {
    return 'Department Index';
  }

  @Get('/all')
  //findAll(@Res() response: Response): Array<any> {
  findAll(@Res() response: Response): Response {
    // move to services
    /* const department = [
      { id: 1, title: 'IT' },
      { id: 2, title: 'HR' },
    ]; */
    //return department;

    const department = this.departmentService.findAll();
    return response.status(200).json(department);
  }

  @Get(':id')
  //findOne(@Param() Params: string): string {
  //findOne(@Param('id') id: string): string {
  findOne(@Param('id') id: string, @Res() response: Response): Response {
    const department = this.departmentService.findOne(id);
    return response.status(200).json(department);
  }
}
