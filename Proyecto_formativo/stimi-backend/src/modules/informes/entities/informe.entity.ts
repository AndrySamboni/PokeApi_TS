import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum InformeEstado {
  APROBADO = 'Aprobado',
  EN_REVISION = 'En Revision',
  REQUIERE_CORRECCIONES = 'Requiere Correcciones',
  PENDIENTE_ENTREGA = 'Pendiente de Entrega',
}

@Entity('informes')
export class Informe {
  @PrimaryColumn('varchar', { length: 50 })
  id: string; // Ej: INF-2025-045

  @ManyToOne(() => User, (user) => user.informes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'instructorId' })
  instructor: User;

  @Column({ type: 'varchar', length: 50 })
  mes: string;

  @Column({ type: 'enum', enum: InformeEstado, default: InformeEstado.EN_REVISION })
  estado: InformeEstado;

  @CreateDateColumn()
  fechaEntrega: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaRevision?: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'revisadoPorId' })
  revisadoPor?: User;

  @Column({ type: 'text', nullable: true })
  observacion?: string;

  @Column({ type: 'varchar', length: 255 })
  archivoUrl: string;
}
