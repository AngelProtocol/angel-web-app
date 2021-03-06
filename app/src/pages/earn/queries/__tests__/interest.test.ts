import { map } from '@terra-dev/use-map';
import { testAddress, testClient } from 'base/test.env';
import {
  dataMap,
  mapVariables,
  query,
  RawData,
  RawVariables,
} from '../interest';

describe('queries/totalDeposit', () => {
  test('should get result from query', async () => {
    const data = await testClient
      .query<RawData, RawVariables>({
        query,
        variables: mapVariables({
          overseerContract: testAddress.moneyMarket.overseer,
        }),
      })
      .then(({ data }) => map(data, dataMap));

    expect(typeof data.marketStatus?.deposit_rate).toBe('string');
  });
});
