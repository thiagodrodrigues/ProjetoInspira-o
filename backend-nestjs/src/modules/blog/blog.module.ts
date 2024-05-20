import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseModule } from '../database/database.module';
import { blogProviders } from './blog.providers';
import { BlogUtils } from './blog.utils';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [BlogController],
  providers: [
    ...blogProviders,
    BlogService,
    BlogUtils,
  ],
})
export class BlogModule {}
