import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb+srv://MahmoudMetwally2699:Mah%401999@cluster0.nrhooyo.mongodb.net/websitecreation'
    ),
    SectionsModule,
  ],
})
export class AppModule {}
