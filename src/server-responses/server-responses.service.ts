import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ServerResponsesService {
  private readonly logger = new Logger(ServerResponsesService.name);

  async ok(res: Response, data: object): Promise<Response> {
    this.logger.warn(data);
    return res.status(StatusCodes.OK).json({ ...data, statusCode: 200 });
  }

  async created(res: Response, data: object): Promise<Response> {
    this.logger.warn(data);
    return res.status(StatusCodes.CREATED).json({ ...data, statusCode: 202 });
  }

  async internalServerError(res: Response, data: object): Promise<Response> {
    this.logger.warn(data);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ ...data, statusCode: 500 });
  }

  async badRequest(res: Response, data: object): Promise<Response> {
    this.logger.warn(data);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ...data, statusCode: 400 });
  }
}
