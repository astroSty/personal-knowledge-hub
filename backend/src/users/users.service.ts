import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async getUsers() {
  const users = await this.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log(users);

  return users;
}

  async findByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: {
      email,
    },
  });
}
  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await this.prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  const { password, ...result } = user;

  return result;
}
}