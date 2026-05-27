import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserEstado } from './entities/user.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { NotificacionTipo } from '../notificaciones/entities/notificacion.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificacionesService: NotificacionesService,
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...result } = user;
    return result;
  }

  async getInstructores() {
    return this.userRepository.find({
      where: { role: UserRole.INSTRUCTOR },
      select: { id: true, nombre: true, cedula: true, email: true, telefono: true, area: true, fechaIngreso: true, estado: true },
      order: { fechaIngreso: 'DESC' },
    });
  }

  async updateEstado(id: string, estado: UserEstado) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Instructor no encontrado');
    }
    user.estado = estado;
    await this.userRepository.save(user);
    
    // Enviar notificación al instructor sobre el cambio de estado de su cuenta
    await this.notificacionesService.create({
      userId: user.id,
      tipo: NotificacionTipo.SISTEMA,
      titulo: 'Estado de Cuenta Actualizado',
      descripcion: `Tu cuenta ha sido marcada como "${estado}" por el coordinador.`,
    });

    return { message: `Estado actualizado a ${estado}`, userId: user.id };
  }
}
