import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserEstado } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (!registerDto.email.endsWith('@sena.edu.co')) {
      throw new BadRequestException('Debe usar un correo institucional con dominio @sena.edu.co.');
    }

    const existingUser = await this.userRepository.findOne({ where: [{ email: registerDto.email }, { cedula: registerDto.cedula }] });
    if (existingUser) {
      throw new BadRequestException('El correo o la cédula ya están registrados.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      estado: UserEstado.PENDIENTE,
    });

    await this.userRepository.save(user);

    // No devolvemos la contraseña
    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (user.estado === UserEstado.PENDIENTE) {
      throw new UnauthorizedException('Cuenta pendiente de activación por el coordinador.');
    }

    if (user.estado === UserEstado.INACTIVO) {
      throw new UnauthorizedException('Cuenta inactiva.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const { password, ...userData } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }
}
