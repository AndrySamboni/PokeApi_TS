import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInformeDto {
  @IsNotEmpty()
  @IsString()
  mes: string;
}
