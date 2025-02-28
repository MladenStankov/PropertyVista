"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get('CORS_ORIGIN'),
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", 'accounts.google.com'],
                connectSrc: ["'self'", 'https://accounts.google.com'],
                frameSrc: ["'self'", 'https://accounts.google.com'],
            },
        },
    }));
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('PropertyVistaSwagger')
        .setDescription('The documentation of the backend of PropertyVista')
        .setVersion('1.0')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    await app.listen(configService.get('PORT', 3000));
    console.log(`Server is listening on: ${await app.getUrl()}`);
    console.log(`Swagger API on: ${await app.getUrl()}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map