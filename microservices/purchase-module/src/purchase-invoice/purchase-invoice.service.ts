import { Injectable } from '@nestjs/common';
import { CreatePurchaseInvoiceDto } from './dto/create-purchase-invoice.dto';
import { UpdatePurchaseInvoiceDto } from './dto/update-purchase-invoice.dto';
import { PrismaService } from 'nestjs-prisma';
import { ReceiptNoteHelper } from 'src/helpers/receiptNoteHelper';
import {  Prisma } from '@prisma/client';
import { Filters } from './entities/purchase-invoice.entity';

@Injectable()
export class PurchaseInvoiceService {
  constructor(
    private readonly prisma: PrismaService,
    private helperReceiptNote: ReceiptNoteHelper,
  ) {}

  async create(createPurchaseInvoiceDto: CreatePurchaseInvoiceDto) {
    return await this.prisma.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        let {idReceiptNote,lines,idStock,idProvider, ...rest } = createPurchaseInvoiceDto;
        if(!idReceiptNote){
          const newReceiptNote = await this.helperReceiptNote.create(
            prisma,
            {
              idStock: idStock,
              idProvider:idProvider,
              typeReceipt:"achat",
              date: createPurchaseInvoiceDto.deliveryDate,
              receiptNoteLines: lines,
              totalAmount:createPurchaseInvoiceDto?.totalAmount,       
              paymentStatus: createPurchaseInvoiceDto?.paymentStatus,
              paymentType: createPurchaseInvoiceDto?.paymentType,
              discount: createPurchaseInvoiceDto?.discount,
              tax: createPurchaseInvoiceDto?.tax,
              modified: createPurchaseInvoiceDto?.modified,
              subTotalAmount: createPurchaseInvoiceDto?.subTotalAmount,
              payedAmount: createPurchaseInvoiceDto?.payedAmount,
              restedAmount: createPurchaseInvoiceDto?.restedAmount,  
            },
          );
          idReceiptNote=newReceiptNote.id
        }
         return await prisma.purchaseInvoice.create({
      data: {
        ...rest,
        idProvider,
        deliveryDate:new Date(rest.deliveryDate).toISOString(),
        PurchaseInvoiceLine: {
          createMany: { data: lines },
        },
        idReceiptNote,
      },
    });
        
      })

  }

  async findAll(filters : Filters) {

    let { take, skip, receipNotesIds } = filters;
    console.log('THIS', take, skip);
  
    take = !take ? 10 : +take;
    skip = !skip ? 0 : +skip;
    
    let where = {};
    
    if (Array.isArray(receipNotesIds) && receipNotesIds.length > 0) {
      where['idReceiptNote'] = {
        in: receipNotesIds.map((elem) => +elem), // Convertir chaque élément en nombre
      };
    }

    return await this.prisma.purchaseInvoice.findMany({
      where,
      take,
      skip,
      include: {
        PurchaseInvoiceLine: { include: { Article: true } },
        ReceiptNote: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.purchaseInvoice.findUnique({
      where: { id },
      include: {
        PurchaseInvoiceLine: { include: { Article: true } },
        ReceiptNote: true,
      },
    });
  }

  async update(id: number, updatepurchaseInvoiceDto: UpdatePurchaseInvoiceDto) {
    let { lines, ...rest } = updatepurchaseInvoiceDto;
    return await this.prisma.purchaseInvoice.update({
      where: { id },
      data: {
        ...rest,
        PurchaseInvoiceLine: {
          updateMany: lines?.map((line) => ({
            where: {
              idArticle: line.idArticle,
              idPurchaseInvoice: id,
            },
            data: {
              quantity: line.quantity,
            },
          })),
        },
      },
    });
  }

  async remove(id: number) {
    // Supprime d'abord toutes les lignes associées
    await this.prisma.purchaseInvoiceLine.deleteMany({
      where: { idPurchaseInvoice: id },
    });
    // Ensuite, supprime la facture d'achat
    return await this.prisma.purchaseInvoice.delete({
      where: { id },
    });
  }
}
