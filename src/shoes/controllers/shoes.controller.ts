import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guards/admin.guard';
import { ResponseToReturn } from 'src/shared/response';
import UuidDto from 'src/shared/uuid.dto';
import RegisterShoeDto from '../dto/register.shoe.dto';
import { ShoesService } from '../services/shoes.service';

@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoeService: ShoesService) {}

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @ApiResponse({
    status: 404,
    description: 'No encontramos esa marca en nuestros registros',
  })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAdminAuthGuard)
  @Post('/brand/:id')
  async createShoe(
    @Body() shoe: RegisterShoeDto,
    @Param() brandId: UuidDto,
  ): Promise<any> {
    return ResponseToReturn(await this.shoeService.createShoe(shoe, brandId));
  }
}
