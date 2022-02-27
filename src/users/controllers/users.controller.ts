import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseToReturn } from 'src/shared/response';
import RegisterUserDto from '../dto/register.user.dto';
import { UsersService } from '../services/users.service';

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
}
