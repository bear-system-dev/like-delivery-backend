import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

let corsOptions: CorsOptions = {};
const ENVIROMENT = process.env.ENVIROMENT || 'dev';

const _defaultOptions: CorsOptions = {
  credentials: true,
  methods: ['POST', 'DELETE', 'PUT', 'PATCH', 'GET'],
  origin: [],
};

switch (ENVIROMENT) {
  case 'dev' || 'development':
    corsOptions = {
      ..._defaultOptions,
      origin: '*',
    };
    break;
  case 'homolog' || 'homologation':
    corsOptions = {
      ..._defaultOptions,
    };
    break;
  default: //Prod
    corsOptions = {
      ..._defaultOptions,
    };
    break;
}

export default corsOptions;
