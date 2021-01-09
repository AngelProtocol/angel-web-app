import { useWallet } from '@anchor-protocol/wallet-provider';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { useAddressProvider } from 'contexts/contract';
import { useMemo } from 'react';

export interface StringifiedData {
  rewardState: {
    Result: string;
  };

  claimableReward: {
    Result: string;
  };
}

export interface Data {
  rewardState: {
    global_index: string;
    total_balance: string;
  };

  claimableReward: {
    address: string;
    balance: string;
    index: string;
    pending_rewards: string;
  };
}

export function parseData({
  rewardState,
  claimableReward,
}: StringifiedData): Data {
  return {
    rewardState: JSON.parse(rewardState.Result),
    claimableReward: JSON.parse(claimableReward.Result),
  };
}

export interface StringifiedVariables {
  bAssetRewardContract: string;
  rewardState: string;
  claimableRewardQuery: string;
}

export interface Variables {
  bAssetRewardContract: string;
  rewardState: {
    state: {};
  };
  claimableRewardQuery: {
    holder: {
      address: string;
    };
  };
}

export function stringifyVariables({
  bAssetRewardContract,
  rewardState,
  claimableRewardQuery,
}: Variables): StringifiedVariables {
  return {
    bAssetRewardContract,
    rewardState: JSON.stringify(rewardState),
    claimableRewardQuery: JSON.stringify(claimableRewardQuery),
  };
}

export const query = gql`
  query claimableReward(
    $bAssetRewardContract: String!
    $rewardState: String!
    $claimableRewardQuery: String!
  ) {
    rewardState: WasmContractsContractAddressStore(
      ContractAddress: $bAssetRewardContract
      QueryMsg: $rewardState
    ) {
      Result
    }

    claimableReward: WasmContractsContractAddressStore(
      ContractAddress: $bAssetRewardContract
      QueryMsg: $claimableRewardQuery
    ) {
      Result
    }
  }
`;

export function useClaimable(): QueryResult<
  StringifiedData,
  StringifiedVariables
> & { parsedData: Data | undefined } {
  const addressProvider = useAddressProvider();
  const { status } = useWallet();

  const result = useQuery<StringifiedData, StringifiedVariables>(query, {
    skip: status.status !== 'ready',
    fetchPolicy: 'cache-and-network',
    variables: stringifyVariables({
      bAssetRewardContract: addressProvider.bAssetReward(''),
      rewardState: {
        state: {},
      },
      claimableRewardQuery: {
        holder: {
          address: status.status === 'ready' ? status.walletAddress : '',
        },
      },
    }),
  });

  const parsedData = useMemo(
    () => (result.data ? parseData(result.data) : undefined),
    [result.data],
  );

  return {
    ...result,
    parsedData,
  };
}
