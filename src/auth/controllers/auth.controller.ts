import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseToReturn } from 'src/shared/response';
import LoginDto from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({
    status: 404,
    description: 'No existe el registro dentro de la base de datos',
  })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signin/admin')
  async signInAdmin(@Body() admin: LoginDto): Promise<any> {
    return ResponseToReturn(await this.authService.loginAdmin(admin));
  }

  @ApiResponse({
    status: 201,
    description: 'El recurso fue creado satisfactoriamente ',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe el registro dentro de la base de datos',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/signin/user')
  async signInUser(@Body() user: LoginDto): Promise<any> {
    return ResponseToReturn(await this.authService.loginUser(user));
  }
}
