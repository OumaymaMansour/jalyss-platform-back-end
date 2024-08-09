import { Injectable } from '@nestjs/common';
import { CreateBonSortyDto } from './dto/create-bon-sorty.dto';
import { UpdateBonSortyDto } from './dto/update-bon-sorty.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BonSortiesService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createBonSortyDto: CreateBonSortyDto) {
    const { bonSortieLines, ...rest } = createBonSortyDto
    const lastExitNoteOfStock = await this.prisma.bonSortie.findMany({
      where: { stockId: createBonSortyDto.stockId },
      take: 1,
      orderBy: {
        num_bonSortie: 'desc',
      },
    });
    return await this.prisma.bonSortie.create({
      data : 
      {
        ...rest,
        num_bonSortie:lastExitNoteOfStock[0].num_bonSortie+1,
        BonSortie_line : 
        {
          createMany : { data : bonSortieLines }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.bonSortie.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.bonSortie.findUnique({ where: { id } });
  }

  async update(id: number, updateBonSortyDto: UpdateBonSortyDto) {
    return await this.prisma.bonSortie.update({
      where: { id },
      data: updateBonSortyDto
    })
  }

  async remove(id: number) {
    return await this.prisma.bonSortie.delete({ where: { id } })
  }
}
