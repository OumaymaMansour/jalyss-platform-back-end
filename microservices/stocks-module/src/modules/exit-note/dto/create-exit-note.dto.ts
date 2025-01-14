import { ApiProperty } from "@nestjs/swagger";

class ExitNoteLine {
    @ApiProperty()
    articleId: number;
    @ApiProperty()
    quantity: number;
}

export class CreateExitNoteDto {
    @ApiProperty()
    exitDate: Date;
    @ApiProperty()
    numExitNote : number 
    @ApiProperty()
    totalAmount ?: number
    @ApiProperty()
    stockId : number
    @ApiProperty({ type: [ExitNoteLine] })
    lines: ExitNoteLine[]
    @ApiProperty()
    idClient? :number;
}

