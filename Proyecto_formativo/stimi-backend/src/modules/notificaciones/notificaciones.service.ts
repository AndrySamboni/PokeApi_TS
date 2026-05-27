import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion, NotificacionTipo } from './entities/notificacion.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ) {}

  async create(data: { userId: string; tipo: NotificacionTipo; titulo: string; descripcion: string; informeId?: string }) {
    const notificacion = this.notificacionRepository.create({
      user: { id: data.userId },
      tipo: data.tipo,
      titulo: data.titulo,
      descripcion: data.descripcion,
      informeId: data.informeId,
    });
    return this.notificacionRepository.save(notificacion);
  }

  async findAllByUser(userId: string) {
    return this.notificacionRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string) {
    const notificacion = await this.notificacionRepository.findOne({ where: { id, user: { id: userId } } });
    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }
    notificacion.leida = true;
    return this.notificacionRepository.save(notificacion);
  }

  async markAllAsRead(userId: string) {
    await this.notificacionRepository.update({ user: { id: userId }, leida: false }, { leida: true });
    return { message: 'Todas las notificaciones marcadas como leídas' };
  }

  async remove(id: string, userId: string) {
    const result = await this.notificacionRepository.delete({ id, user: { id: userId } });
    if (result.affected === 0) {
      throw new NotFoundException('Notificación no encontrada');
    }
    return { message: 'Notificación eliminada' };
  }
}
