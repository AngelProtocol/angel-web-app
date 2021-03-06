import { map } from '@terra-dev/use-map';
import { testAddressProvider, testClient } from 'base/test.env';
import { dataMap, mapVariables, query, RawData, RawVariables } from '../polls';

describe('queries/polls', () => {
  test('should get result from query', async () => {
    const data = await testClient
      .query<RawData, RawVariables>({
        query,
        variables: mapVariables({
          Gov_contract: testAddressProvider.gov(),
          PollsQuery: {
            polls: {
              limit: 6,
            },
          },
        }),
      })
      .then(({ data }) => map(data, dataMap));

    expect(Array.isArray(data.polls?.polls)).toBeTruthy();
  });
});
