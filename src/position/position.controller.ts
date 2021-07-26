import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PositionService } from './position.service';
//import { CreatePositionDto } from './dto/create-position.dto';
//import { UpdatePositionDto } from './dto/update-position.dto';
//import { Position, Prisma } from '@prisma/client';
import { Position, Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  // Dto:: ถือข้อมูลไว้ ไม่จำเป็นต้องมาจาก DB
  /* @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  } */

  // สามารถใช้ Prisma โดยไม่ผ่าน Dto ได้ด้วยเช่นกัน
  // เหมาะกับการทำกับ Data ที่ต่อกับ DB
  // ทำ validation ยากกว่า Dto
  @Post()
  //create(@Body() createPositionData: Prisma.PositionCreateInput): Promise<Position> {
  // Return Promise Response
  async create(
    @Body() createPositionData: Prisma.PositionCreateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const position = await this.positionService.create(createPositionData);
    return response.status(200).json(position);
    //return this.positionService.create(createPositionData);
  }

  @Get()
  async findAll(): Promise<Position[]> {
    //const position = await this.positionService.findAll();
    //return response.status(200).json(position);
    return this.positionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Position> {
    return await this.positionService.findOne(+id);
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(+id, updatePositionDto);
  } */

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionData: Prisma.PositionUpdateInput,
  ): Promise<Position> {
    return await this.positionService.update(+id, updatePositionData);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.positionService.remove(+id);
      return response.status(200).json({ message: 'ลบข้อมูลเรียบร้อยแล้ว' });
      //return this.positionService.remove(+id);
    } catch (error) {
      /* if (error.code === 'P2025') {
        console.log(error);
        return response
          .status(400)
          .json({ message: 'ไม่พบข้อมูลที่ต้องการลบ' });
      } */
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return response.status(400).json({
          message: 'ไม่พบข้อมูลที่ต้องการลบ',
          message_other: error.message,
        });
      }
      return response
        .status(400)
        .json({ message: 'เกิดข้อผิดพลาด, Server Error' });
    }
  }
}
