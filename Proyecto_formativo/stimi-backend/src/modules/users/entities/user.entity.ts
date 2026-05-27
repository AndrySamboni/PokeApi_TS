import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Informe } from '../../informes/entities/informe.entity';
import { Notificacion } from '../../notificaciones/entities/notificacion.entity';

export enum UserEstado {
  PENDIENTE = 'Pendiente',
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

export enum UserRole {
  INSTRUCTOR = 'INSTRUCTOR',
  COORDINADOR = 'COORDINADOR',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cedula: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  area: string;

  @CreateDateColumn()
  fechaIngreso: Date;

  @Column({ type: 'enum', enum: UserEstado, default: UserEstado.PENDIENTE })
  estado: UserEstado;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.INSTRUCTOR })
  role: UserRole;

  @Column({ type: 'varchar', length: 50, nullable: true })
  banco?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipoCuenta?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numeroCuenta?: string;

  @OneToMany(() => Informe, (informe) => informe.instructor)
  informes: Informe[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.user)
  notificaciones: Notificacion[];
}
