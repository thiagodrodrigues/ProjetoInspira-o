import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export class Swagger {
  configSwagger = (
    title: string,
    description: string,
    version: string,
    tag: string,
    app: any,
  ): void => {
    const config = new DocumentBuilder()
      .addBearerAuth()

      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag(tag)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: `Docs @${process.env.npm_package_name}`,
    };

    SwaggerModule.setup('docs', app, document, customOptions);
  };
}
