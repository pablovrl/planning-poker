import { Module } from '@nestjs/common';
import { PlanningGateway } from './planning.gateway';
import { PlanningService } from './planning.service';

@Module({
  providers: [PlanningGateway, PlanningService],
})
export class PlanningModule {}
