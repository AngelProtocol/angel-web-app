import { map } from '@terra-dev/use-map';
import big from 'big.js';
import { dataMap, query, RawData, RawVariables } from '../tax';
import { testClient } from '../../test.env';

describe('queries/tax', () => {
  test('should get result from query', async () => {
    const data = await testClient
      .query<RawData, RawVariables>({
        query,
      })
      .then(({ data }) => map(data, dataMap));

    expect(big(data.taxRate!).gt(0)).toBeTruthy();
    expect(big(data.maxTaxUUSD!).gt(0)).toBeTruthy();
  });
});
