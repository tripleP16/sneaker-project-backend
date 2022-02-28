import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import UuidDto from '../../shared/uuid.dto';
import { ResponseToReturn } from '../../shared/response';
import RegisterUserDto from '../dto/register.user.dto';
import { UsersService } from '../services/users.service';
import { JwtUserGuard } from '../../auth/guards/user.guard';
import { GetUser } from '../../auth/decorators/get.user.decorator';
import ReturnUser from '../dto/return.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 409, description: 'El email esta en uso' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() user: RegisterUserDto): Promise<any> {
    return ResponseToReturn(await this.userService.registerUser(user));
  }

  @ApiResponse({
    status: 200,
    description: 'El recurso fue actualizado satisfactoriamente ',
  })
  @ApiResponse({
    status: 409,
    description: 'El zapato ya se encuentra en la lista de favoritos',
  })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/shoe/:id')
  async addShoeToFavorite(
    @Param() id: UuidDto,
    @GetUser() user: ReturnUser,
  ): Promise<any> {
    return ResponseToReturn(await this.userService.addShoe(id, user._id));
  }

  @ApiResponse({
    status: 200,
    description: 'El recurso fue actualizado satisfactoriamente ',
  })
  @ApiResponse({
    status: 409,
    description: 'El zapato no se encuentra en la lista de favoritos',
  })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/shoe/delete/:id')
  async deleteShoeToFavorite(
    @Param() id: UuidDto,
    @GetUser() user: ReturnUser,
  ): Promise<any> {
    return ResponseToReturn(await this.userService.deleteShoe(id, user._id));
  }

  @ApiResponse({
    status: 200,
    description: 'El recurso fue encontrado ',
  })
  @ApiResponse({ status: 404, description: 'El usuario no existe' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @ApiResponse({ status: 401, description: 'No esta autorizado' })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/favorite')
  async getFavorites(@GetUser() user: ReturnUser): Promise<any> {
    return ResponseToReturn(await this.userService.getFavorites(user._id));
  }
}
