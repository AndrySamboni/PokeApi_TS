import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Informe } from './entities/informe.entity';
import { InformesService } from './informes.service';
import { InformesController } from './informes.controller';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Informe]),
    NotificacionesModule,
  ],
  controllers: [InformesController],
  providers: [InformesService],
})
export class InformesModule {}
