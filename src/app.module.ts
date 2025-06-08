import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { OfferModule } from './offer/offer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './db/data-source';
import { UsersModule } from './users/users.module';
import { CandidatureModule } from './candidature/candidature.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: ['dev.env']
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        return {
          message: error.message,
          status: error.extensions?.status,
        };
      }
    }),
    OfferModule,
    UsersModule,
    CandidatureModule,
    AuthModule,
  ],
})
export class AppModule { }
