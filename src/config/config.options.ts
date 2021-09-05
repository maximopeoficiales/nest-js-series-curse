import { CorsOptions, CorsOptionsDelegate } from "@nestjs/common/interfaces/external/cors-options.interface";
// import { JwtModuleOptions } from "@nestjs/jwt";
// import { MongooseModuleOptions } from "@nestjs/mongoose";
// import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
// import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
// import { getConnectionOptions } from "typeorm";
import { Config } from "./config.key";
// import { ConfigService } from "./config.service";

// instancia provicional para usar las variables de entorno
// const _configService = new ConfigService();

export const optionsCors: CorsOptions | CorsOptionsDelegate<any> = {
    allowedHeaders: "*",
    origin: "*"
};


// export const optionsSwagger = new DocumentBuilder()
//     .setTitle("API JOINNUS UNOFFICIAL")
//     .setDescription("Esta api esta obtiene los datos el sitio https://www.joinnus.com/")
//     .setVersion("1.0")
//     .build();

// export const optionsCustomSwagger: SwaggerCustomOptions = {
//     explorer: true,
//     swaggerOptions: { filter: true, showRequestDuration: true },
// }

// type ConfigMongoose = {
//     uri: string,
//     options?: MongooseModuleOptions
// }

// export const configMongoose: ConfigMongoose = {
//     uri: 'mongodb://localhost/todoApp',
//     options: {
//         useNewUrlParser: true
//     }
// }

// export const configTypeORM: TypeOrmModuleAsyncOptions = {
//     useFactory: async () =>
//         Object.assign(await getConnectionOptions(), {
//             autoLoadEntities: true,
//         }),
// }

// export const optionsJwt: JwtModuleOptions = {
//     secret: _configService.get(Config.KEY_AUTH),
//     signOptions: { expiresIn: '60s' },
// }