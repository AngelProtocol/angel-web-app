import { map } from '@terra-dev/use-map';
import { testAddress, testClient } from 'base/test.env';
import {
  dataMap,
  mapVariables,
  query,
  RawData,
  RawVariables,
} from '../exchangeRate';

describe('queries/exchangeRate', () => {
  test('should get result from query', async () => {
    const data = await testClient
      .query<RawData, RawVariables>({
        query,
        variables: mapVariables({
          bLunaHubContract: testAddress.bluna.hub,
          stateQuery: {
            state: {},
          },
          parametersQuery: {
            parameters: {},
          },
        }),
      })
      .then(({ data }) => map(data, dataMap));

    expect(data.exchangeRate).not.toBeUndefined();
  });
});
