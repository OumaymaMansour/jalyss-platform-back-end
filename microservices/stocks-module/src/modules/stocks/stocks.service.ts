import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from 'nestjs-prisma';
import { FiltersStock } from './entities/stock.entity';
import { title } from 'process';

@Injectable()
export class StocksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStockDto: CreateStockDto) {
    return await this.prisma.stock.create({
      data: createStockDto,
    });
  }

  async findAll(filters?: FiltersStock) {
    return await this.prisma.stock.findMany({});
  }

  async findOne(id: number, filters?: FiltersStock) {
    let { take, skip, text } = filters;
    console.log(take, skip);
    take = !take ? 10 : +take;
    skip = !skip ? 0 : +skip;
    let whereArticles = {};
    let whereCount = { stockId: id };
    if (text) {
      const articlesWithTitleHello = await this.prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: text } },
            { code: { contains: text } },
            {
              articleByAuthor: {
                some: {
                  author: {
                    OR: [
                      { nameAr: { contains: text } },
                      { nameEn: { contains: text } },
                    ],
                  },
                },
              },
            },
            {
              articleByPublishingHouse: {
                some: {
                  publishingHouse: {
                    OR: [
                      { nameAr: { contains: text } },
                      { nameEn: { contains: text } },
                    ],
                  },
                },
              },
            },
          ],
        },
        include: {
          articleByAuthor: { include: { author: true } },
          articleByPublishingHouse: { include: { publishingHouse: true } },
          cover: true,
        },
        take,
        skip,
      });

      whereArticles['articleId'] = {
        in: articlesWithTitleHello.map((article) => article.id),
      };
      whereCount['OR'] = [
        {
          article: {
            OR: [
              { title: { contains: text } },
              { code: { contains: text } },
              {
                articleByAuthor: {
                  some: {
                    author: {
                      OR: [
                        { nameAr: { contains: text } },
                        { nameEn: { contains: text } },
                      ],
                    },
                  },
                },
              },
              {
                articleByPublishingHouse: {
                  some: {
                    publishingHouse: {
                      OR: [
                        { nameAr: { contains: text } },
                        { nameEn: { contains: text } },
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      ];
    }

    let data = await this.prisma.stock.findUnique({
      where: { id },
      include: {
        stockArticle: {
          where: whereArticles,
          include: {
            article: {
              include: {
                articleByAuthor: { include: { author: true } },
                articleByPublishingHouse: {
                  include: { publishingHouse: true },
                },
                cover: true,
              },
            },
          },
          take,
          skip,
        },
      },
    });

    let count = await this.prisma.stockArticle.count({ where: whereCount });

    return { data, count };
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    return await this.prisma.stock.update({
      where: { id },
      data: updateStockDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.stock.delete({ where: { id } });
  }
}
