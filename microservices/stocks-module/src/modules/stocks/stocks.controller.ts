import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}
  @MessagePattern({ cmd: 'create_stock' })
  async create(@Payload() message: CreateStockDto) : Promise<any> {
    return await this.stocksService.create(message);
  }

  @MessagePattern({ cmd: 'all_stocks' })
  async findAll() {
    return await this.stocksService.findAll();
  }

@MessagePattern({ cmd: ':id' })
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @MessagePattern({ cmd: ':id' })
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @MessagePattern({ cmd: ':id' })
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
