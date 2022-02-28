import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guards/admin.guard';
import { ResponseToReturn } from '../../shared/response';
import RegisterBrandDto from '../dto/register.brand.dto';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAdminAuthGuard)
  @Post('/')
  async createBrand(@Body() brand: RegisterBrandDto): Promise<any> {
    return ResponseToReturn(await this.brandsService.registerBrand(brand));
  }

  @ApiResponse({
    status: 200,
    description: 'El recurso fue encontrado satisfactoriamente',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getBrands(): Promise<any> {
    return ResponseToReturn(await this.brandsService.getBrands());
  }
}
