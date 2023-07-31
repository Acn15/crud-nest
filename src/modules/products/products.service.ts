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

  async update(id: string, data: ProductsDTO) {
    const productsExists = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });
    if (!productsExists) {
      throw new Error('This products dont exists :/');
    }
    return await this.prisma.products.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: string) {
    const productsExist = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });
    if (!productsExist) {
      throw new Error('This product dont exist');
    }
    return await this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
