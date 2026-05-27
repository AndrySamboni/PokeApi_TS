import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InformeEstado } from '../entities/informe.entity';

export class ReviewInformeDto {
  @IsNotEmpty()
  @IsEnum(InformeEstado)
  estado: InformeEstado;

  @IsOptional()
  @IsString()
  observacion?: string;
}
