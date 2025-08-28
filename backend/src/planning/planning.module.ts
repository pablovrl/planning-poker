import { Module } from '@nestjs/common';
import { PlanningGateway } from './planning.gateway';

@Module({
  providers: [PlanningGateway],
})
export class PlanningModule {}
