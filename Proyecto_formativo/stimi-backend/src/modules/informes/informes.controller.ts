import { Controller, Get, Post, Patch, Param, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InformesService } from './informes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ReviewInformeDto } from './dto/review-informe.dto';
import { InformeEstado } from './entities/informe.entity';
import { CreateInformeDto } from './dto/create-informe.dto';

@Controller('informes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InformesController {
  constructor(private readonly informesService: InformesService) {}

  @Roles(UserRole.INSTRUCTOR)
  @Post()
  @UseInterceptors(FileInterceptor('pdf', {
    storage: diskStorage({
      destination: './uploads/informes',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new BadRequestException('Solo se permiten archivos PDF'), false);
      }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }))
  create(
    @Body() createDto: CreateInformeDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new BadRequestException('El archivo PDF es requerido');
    }
    return this.informesService.create(user.userId, createDto.mes, file.path);
  }

  @Roles(UserRole.INSTRUCTOR)
  @Get('me')
  findAllByInstructor(@CurrentUser() user: any) {
    return this.informesService.findAllByInstructor(user.userId);
  }

  @Roles(UserRole.COORDINADOR)
  @Get()
  findAll(@Query('estado') estado?: InformeEstado) {
    return this.informesService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informesService.findOne(id);
  }

  @Roles(UserRole.COORDINADOR)
  @Patch(':id/review')
  review(
    @Param('id') id: string,
    @Body() reviewDto: ReviewInformeDto,
    @CurrentUser() user: any,
  ) {
    return this.informesService.review(id, user.userId, reviewDto);
  }
}
