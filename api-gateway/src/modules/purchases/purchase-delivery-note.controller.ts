import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseDeliveryNoteService } from './purchase-delivery-note.service';
import { CreatePurchaseDeliveryNoteDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDeliveryNoteDto } from './dto/update-purchase.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('purchase-delivery-note')
@ApiTags('Purchase Delivery Note')
export class PurchaseDeliveryNoteController {
  constructor(private readonly purchaseDeliveryNoteService: PurchaseDeliveryNoteService) {}

  @Post('create')
  create(@Body() createPurchaseDeliveryNoteDto: CreatePurchaseDeliveryNoteDto) {
    return this.purchaseDeliveryNoteService.create(createPurchaseDeliveryNoteDto);
  }

  @Get('getAll')
  findAll() {
    return this.purchaseDeliveryNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.purchaseDeliveryNoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePurchaseDeliveryNoteDto: UpdatePurchaseDeliveryNoteDto) {
    return this.purchaseDeliveryNoteService.update(+id, updatePurchaseDeliveryNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.purchaseDeliveryNoteService.remove(+id);
  }
}
