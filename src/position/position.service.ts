import {
  //BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Position, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
//import { CreatePositionDto } from './dto/create-position.dto';
//import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(private readonly prismaService: PrismaService) {}

  // with Dto
  /* async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const position = await this.prismaService.position.create({
      data: {
        title: createPositionDto.title,
      },
    });
    return position;

    //const title = createPositionDto.title;
    //return `This action adds a new position: ${title}`;

    //return 'This action adds a new position';
  } */

  // with Prisma
  async create(
    createPositionData: Prisma.PositionCreateInput,
  ): Promise<Position> {
    const position = await this.prismaService.position.create({
      data: {
        title: createPositionData.title,
      },
    });
    return position;

    // const title = createPositionDto.title;
    // return `This action adds a new position: ${title}`;

    // return 'This action adds a new position';
  }

  async findAll() {
    const position = await this.prismaService.position.findMany({
      orderBy: { id: 'desc' },
    });
    return position;
    // return `This action returns all position`;
  }

  async findOne(id: number): Promise<Position> {
    /* if (!id) {
      throw new BadRequestException('ข้อมูลไม่ถูกต้อง');
    } */
    const position = await this.prismaService.position.findUnique({
      where: { id: id },
    });

    if (!position) {
      throw new NotFoundException('ไม่พบข้อมูลนี้');
    }
    return position;
    // return `This action returns a #${id} position`;
  }

  /* update(id: number, updatePositionDto: UpdatePositionDto) {
    const title = updatePositionDto.title;
    //return `This action updates a #${id} position`;
    return `This action updates a #${id} position, title: ${title}`;
  } */

  async update(
    id: number,
    updatePositionData: Prisma.PositionUpdateInput,
  ): Promise<Position> {
    const position = this.prismaService.position.update({
      where: { id: id },
      //data: updatePositionData, // All Data
      data: {
        title: updatePositionData.title,
      },
    });
    return position;
    //return `This action updates a #${id} position`;
    //return `This action updates a #${id} position, title: ${title}`;
  }

  async remove(id: number): Promise<Position> {
    const position = await this.prismaService.position.delete({
      where: { id: id },
    });
    return position;
    //return `This action removes a #${id} position`;
  }
}
