import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guards';
import { CategoriesModule } from './modules/categories/categories.module';
import { UserModule } from './modules/user/user.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    CategoriesModule,
    BankAccountsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
