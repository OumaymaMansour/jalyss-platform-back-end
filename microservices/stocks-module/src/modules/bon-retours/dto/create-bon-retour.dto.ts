import { ApiProperty } from '@nestjs/swagger';


class ArticleRetour {
    @ApiProperty()
    id_article: number;
    @ApiProperty()
    qunatity: number;
  }
  
export class CreateBonRetourDto {
    @ApiProperty()
    returnDate: Date
    @ApiProperty({ type: [ArticleRetour] })
    lines: ArticleRetour[];
}
