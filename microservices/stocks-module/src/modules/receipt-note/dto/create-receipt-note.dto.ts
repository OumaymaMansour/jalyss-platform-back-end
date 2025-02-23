import { ApiProperty } from '@nestjs/swagger';
import { TypeReceipt } from '@prisma/client';

class ReceiptNoteLine {
  @ApiProperty()
  idArticle: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price?: number;
}
export class CreateReceiptNoteDto {
  @ApiProperty()
  typeReceipt: TypeReceipt;
  @ApiProperty()
  receiptDate: Date;
  @ApiProperty()
  idStock: number;
  @ApiProperty({ type: [ReceiptNoteLine] })
  lines: ReceiptNoteLine[];
  @ApiProperty()
  numReceiptNote: number;
  @ApiProperty()
  totalAmount?: number;
  @ApiProperty()
  idProvider?: number;
}
