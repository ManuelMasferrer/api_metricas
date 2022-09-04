import { RegionService } from './region.service';
import { Module } from '@nestjs/common';
import { RegionEntity } from './region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  controllers: [],
  providers: [
    RegionService,],
})
export class RegionModule { }
