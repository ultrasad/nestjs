import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  private department = [
    { id: 1, title: 'IT' },
    { id: 2, title: 'HR' },
    { id: 3, title: 'Call Center' },
  ];

  findAll() {
    return this.department;
  }

  findOne(id: string) {
    const department = this.department.find((item) => item.id === +id); // +id convert string to number
    if (!department) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      //throw new NotFoundException('Not Found'); // Default Exception
    }
    return department;
  }
}
