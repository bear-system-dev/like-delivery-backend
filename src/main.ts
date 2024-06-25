import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const SWAGGER_DOCS_PATH = process.env.SWAGGER_DOCS_PATH || 'v1/api/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Documentação Like Delivery - Backend')
    .setDescription(
      `Aqui você encontra todos os endpoints da aplicação. Qualquer dúvida, entre em contato com o gerenciador do sistema.
    \n<em>ATENÇÃO!</em> Ao fazer uma requisição, o banco de dados pode ser alterado. Se isso ocorrer, por favor, remova os dados que você adicionou.
    \n<i><b>Mais detalhes sobre o funcionamento você encontra na <a alt='docs' href='https://github.com/bear-system-dev/like-delivery-backend?tab=readme-ov-file#' target='_blank'>documentação</a> do repositório</b></i>
    `,
    )
    .setVersion('v1.0')
    .setLicense(
      `©2023-2024 Bear System | Todos os direitos reservados`,
      `https://bearsystem.onrender.com`,
    )
    .addTag('Authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);
  await app.listen(3000);
}
bootstrap();
