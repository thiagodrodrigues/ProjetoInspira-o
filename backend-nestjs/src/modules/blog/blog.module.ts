import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseModule } from '../database/database.module';
import { blogProviders } from './blog.providers';
import { BlogUtils } from './blog.utils';
import { OwnerUserGuard } from '../users/owner.guard';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [BlogController],
  providers: [
    ...blogProviders,
    ...usersProviders,
    BlogService,
    BlogUtils,
    OwnerUserGuard,
  ],
})
export class BlogModule {}
