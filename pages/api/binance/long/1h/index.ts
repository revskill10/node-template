import {
    core,
    RequestAsyncHandler,
    NewResponseBuilder,
    JoiRequestValidation,
  } from 'server/adapter/middlewares';
  import { BinanceController } from 'server/controllers/binance';
  import * as jf from 'joiful';
  const url = '/api/binance/long/1h';
  class LongOneHourBinanceResponse {
    @(jf.string())
    result: string;
  }
  class LongOneHourBinanceRequestBody {
    @(jf.string())
    text: string;
  }
  const binanceController = new BinanceController();
  const handler = core().post(
    url,
    JoiRequestValidation({
        body: LongOneHourBinanceRequestBody
    }),
    RequestAsyncHandler(
      async (req) => {
        const app = req.app;
        const { text } = req.body;
        app.logger.info({}, 'test');
        await binanceController.long1h(text);
        return { result: 'ok' };
      }
    ),
    NewResponseBuilder(LongOneHourBinanceResponse)
  );
  
  export default handler;
  