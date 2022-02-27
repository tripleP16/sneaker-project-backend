import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import UuidDto from '../../shared/uuid.dto';
import { JwtAdminAuthGuard } from '../../auth/guards/admin.guard';
import { ResponseToReturn } from '../../shared/response';
import { RegisterStoreDto } from '../dto/register.store.dto';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAdminAuthGuard)
  @Post('/')
  async createStore(@Body() store: RegisterStoreDto): Promise<any> {
    return ResponseToReturn(await this.storeService.createStore(store));
  }

  @ApiResponse({
    status: 200,
    description: 'El recurso fue actualizado correctamente',
  })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAdminAuthGuard)
  @Patch('/add/:id/shoe')
  async addShoetoStore(
    @Body() shoe_id: UuidDto,
    @Param() id: UuidDto,
  ): Promise<any> {
    return ResponseToReturn(
      await this.storeService.addShoeToStore(id, shoe_id),
    );
  }
}
