import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProductsDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProductsDTO) {
    const productsExists = await this.prisma.products.findFirst({
      where: {
        id: data.id,
      },
    });

    if (productsExists) {
      throw new Error('Products already exists :/');
    }
    const products = await this.prisma.products.create({
      data,
    });
    return products;
  }

  async findAll() {
    return this.prisma.products.findMany();
  }
}
