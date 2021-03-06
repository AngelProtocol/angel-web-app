import { map } from '@terra-dev/use-map';
import { testAddress, testClient, testWalletAddress } from 'base/test.env';
import {
  dataMap,
  mapVariables,
  query,
  RawData,
  RawVariables,
} from '../rewardsAncGovernance';

describe('queries/rewardsAncGovernance', () => {
  test('should get result from query', async () => {
    const data = await testClient
      .query<RawData, RawVariables>({
        query,
        variables: mapVariables({
          ANC_Gov_contract: testAddress.anchorToken.gov,
          ANC_token_contract: testAddress.cw20.ANC,
          UserANCBalanceQuery: {
            balance: {
              address: testWalletAddress,
            },
          },
          UserGovStakeInfoQuery: {
            staker: {
              address: testWalletAddress,
            },
          },
        }),
      })
      .then(({ data }) => map(data, dataMap));

    expect(typeof data.userGovStakingInfo?.balance).toBe('string');
    expect(typeof data.userANCBalance?.balance).toBe('string');
  });
});
