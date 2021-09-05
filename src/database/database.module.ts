import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';
// import { DatabaseService } from './database.service';
// carga todas las conexios y las exporta

@Module({
  providers: [],
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
