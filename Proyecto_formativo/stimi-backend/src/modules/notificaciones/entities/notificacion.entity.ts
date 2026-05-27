import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificacionTipo {
  CORRECCION = 'correccion',
  APROBADO = 'aprobado',
  RECORDATORIO = 'recordatorio',
  SISTEMA = 'sistema',
}

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notificaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: NotificacionTipo })
  tipo: NotificacionTipo;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  leida: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informeId?: string;
}
