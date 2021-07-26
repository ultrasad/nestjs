import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  providers: [StaffService],
  imports: [PrismaModule],
  controllers: [StaffController],
})
export class StaffModule {}
