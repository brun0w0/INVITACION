import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { InvitadoModule } from './invitado/invitado.module';
import { AcompananteModule } from './acompanante/acompanante.module';
@Module({
  imports: [InvitadoModule, AcompananteModule ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
