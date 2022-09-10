import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';

@Module({
  controllers: [PaisController]
})
export class PaisModule {}
