import { Controller, Post, Get, Res, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        const user = await this.usersService.register(body.email, body.password);
        return { id: user.id, email: user.email };
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() body: { email: string; password: string },
        @Res({ passthrough: true }) res
    ) {
        const { token } = await this.usersService.login(body.email, body.password);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return { success: true }
    }

    @Post('logout')
    @HttpCode(200)
    logout(@Res( {passthrough: true} ) res) {
        res.clearCookie('token');
        return { success: true };
    }

    @Get('me')
    @UseGuards(JwtGuard)
    getMe(@Request() req: any) {
        return req.user;
    }
}