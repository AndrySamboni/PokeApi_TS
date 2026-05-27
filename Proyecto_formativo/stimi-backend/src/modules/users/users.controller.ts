import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, UserEstado } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findById(user.userId);
  }

  @Roles(UserRole.COORDINADOR)
  @Get('instructores')
  getInstructores() {
    return this.usersService.getInstructores();
  }

  @Roles(UserRole.COORDINADOR)
  @Patch('instructores/:id/estado')
  updateEstado(
    @Param('id') id: string,
    @Body('estado') estado: UserEstado,
  ) {
    return this.usersService.updateEstado(id, estado);
  }
}
