import { ApiProperty } from "@nestjs/swagger";

export class CreateSellingDto {
    @ApiProperty()
    name : string;
    @ApiProperty()
    type : string;
    @ApiProperty()
    region : string;
    @ApiProperty()
    idStock : number;
}

export class CreatePurchaseOrderDto {
    @ApiProperty()
    orderDate: Date;
    @ApiProperty()
    date: Date;
}

class SalesDeliveryNoteLine {
  @ApiProperty()
  articalId: number;
  @ApiProperty()
  quantity: number;
}

export class CreateSalesDeliveryNoteDto {
  @ApiProperty()
  idPurchaseOrder?: number;
  @ApiProperty()
  exitNoteId: number;
  @ApiProperty()
  idClient: number;
  @ApiProperty()
  saleChannelId: number;
  @ApiProperty()
  deliveryDate: Date;
  @ApiProperty({type : [SalesDeliveryNoteLine]})
  salesDeliveryNoteLine: SalesDeliveryNoteLine[]
}

class SalesInvoiceLine {
  @ApiProperty()
  articalId: number;
  @ApiProperty()
  quantity: number;
}

export class CreateSalesInvoiceDto {
  @ApiProperty()
  idPurchaseOrder?: number;
  @ApiProperty()
  exitNoteId: number;
  @ApiProperty()
  idClient: number;
  @ApiProperty()
  saleChannelId: number;
  @ApiProperty()
  date: Date;
  @ApiProperty({ type: [SalesInvoiceLine] })
  salesInvoiceLine: SalesInvoiceLine[];
}
class SalesDeliveryInvoiceLine {
  @ApiProperty()
  articalId: number;
  @ApiProperty()
  quantity: number;
}

export class CreateSalesDeliveryInvoiceDto {
  @ApiProperty()
  purchaseOrderId?: number; //bon de commande
  @ApiProperty()
  exitNoteId: number;
  @ApiProperty()
  clientId: number;
  @ApiProperty()
  salesChannelsId: number;
  @ApiProperty()
  deliveryDate: Date;
  @ApiProperty({ type: [SalesDeliveryInvoiceLine] })
  salesDeliveryInvoicelines: SalesDeliveryInvoiceLine[];
}
