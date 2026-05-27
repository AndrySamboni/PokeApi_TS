import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Informe, InformeEstado } from './entities/informe.entity';
import { ReviewInformeDto } from './dto/review-informe.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { NotificacionTipo } from '../notificaciones/entities/notificacion.entity';

@Injectable()
export class InformesService {
  constructor(
    @InjectRepository(Informe)
    private readonly informeRepository: Repository<Informe>,
    private readonly notificacionesService: NotificacionesService,
  ) {}

  async create(instructorId: string, mes: string, archivoUrl: string) {
    const id = `INF-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const informe = this.informeRepository.create({
      id,
      instructor: { id: instructorId },
      mes,
      archivoUrl,
      estado: InformeEstado.EN_REVISION,
    });
    return this.informeRepository.save(informe);
  }

  async findAllByInstructor(instructorId: string) {
    return this.informeRepository.find({
      where: { instructor: { id: instructorId } },
      order: { fechaEntrega: 'DESC' },
    });
  }

  async findAll(estado?: InformeEstado) {
    const whereClause = estado ? { estado } : {};
    return this.informeRepository.find({
      where: whereClause,
      relations: { instructor: true },
      order: { fechaEntrega: 'DESC' },
    });
  }

  async findOne(id: string) {
    const informe = await this.informeRepository.findOne({
      where: { id },
      relations: { instructor: true, revisadoPor: true },
    });
    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }
    return informe;
  }

  async review(id: string, coordinadorId: string, reviewDto: ReviewInformeDto) {
    const informe = await this.findOne(id);
    
    informe.estado = reviewDto.estado;
    informe.observacion = reviewDto.observacion;
    informe.fechaRevision = new Date();
    informe.revisadoPor = { id: coordinadorId } as any;

    await this.informeRepository.save(informe);

    // Si requiere correcciones, crear notificación
    if (reviewDto.estado === InformeEstado.REQUIERE_CORRECCIONES) {
      await this.notificacionesService.create({
        userId: informe.instructor.id,
        tipo: NotificacionTipo.CORRECCION,
        titulo: `Correcciones Solicitadas - ${informe.mes}`,
        descripcion: reviewDto.observacion || 'El coordinador ha solicitado correcciones en tu informe.',
        informeId: informe.id,
      });
    } else if (reviewDto.estado === InformeEstado.APROBADO) {
      await this.notificacionesService.create({
        userId: informe.instructor.id,
        tipo: NotificacionTipo.APROBADO,
        titulo: `Informe Aprobado - ${informe.mes}`,
        descripcion: 'Tu informe ha sido aprobado por el coordinador.',
        informeId: informe.id,
      });
    }

    return informe;
  }
}
