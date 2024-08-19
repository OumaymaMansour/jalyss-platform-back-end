import { Inject, Injectable } from '@nestjs/common';
import { CreateExitNoteDto } from './dto/create-stock.dto';
import { UpdateExitNoteDto } from './dto/update-stock.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ExitNoteService {
  constructor(@Inject ('STOCKS_MICROSERVICE') private readonly stocksClient: ClientProxy
) {}
  create(createExitNoteDto: CreateExitNoteDto ) {
    return this.stocksClient.send(
      { cmd: 'create_exitNote' }, 
      createExitNoteDto
    );
  }

  findAll() {
    return this.stocksClient.send(
      { cmd: 'all_exitNote' },
      {}
    )
  }

  findOne(id: number) {
    return this.stocksClient.send(
      { cmd: 'one_exitNote' },
      {id}
    )
  }

  update(id: number, UpdateExitNoteDto: UpdateExitNoteDto) {
    return this.stocksClient.send(
      { cmd: 'update_exitNote' },
      {id, UpdateExitNoteDto}
    )
  }

  remove(id: number) {
    return this.stocksClient.send(
      { cmd: 'remove_exitNote' },
      {id}
    )
  }
}