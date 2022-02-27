import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseToReturn } from '../../shared/response';
import RegisterAdminDto from '../dto/register.admin.dto';
import { AdminService } from '../services/admin.service';
import { JwtAdminAuthGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtAdminAuthGuard)
  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 409, description: 'El email esta en uso' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  async createAdmin(@Body() admin: RegisterAdminDto): Promise<any> {
    return ResponseToReturn(await this.adminService.createAdmin(admin));
  }
}
