import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(email: string, password: string): Promise<User> {
        const existing = await this.usersRepository.findOne({ where: { email } });
        if (existing) {
            throw new ConflictException('Email already in use');
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, password: hashed });
        return this.usersRepository.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}