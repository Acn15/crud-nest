import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: ProductsDTO) {
    return this.productsService.create(data);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ProductsDTO) {
    return this.productsService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
