import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'src/config/config.key';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';


export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: true,
                type: "postgres",
                host: config.get(Config.DB_HOST),
                username: config.get(Config.DB_USER),
                password: config.get(Config.DB_PASSWORD),
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                migrations: [__dirname + "/migrations/*.entity{.ts,.js}"],
                synchronize: true,

            } as ConnectionOptions
        }
    })
];