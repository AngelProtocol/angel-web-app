import type { ubLuna, uLuna } from '@anchor-protocol/types';
import { bluna } from '@anchor-protocol/types';
import big, { Big } from 'big.js';

interface History {
  blunaAmount: ubLuna<Big>;
  lunaAmount?: uLuna<Big>;
  requestTime?: Date;
  claimableTime?: Date;
}

export function withdrawAllHistory(
  unbondRequests:
    | (bluna.hub.UnbondRequestsResponse & { startFrom: number })
    | undefined,
  allHistory: bluna.hub.AllHistoryResponse | undefined,
  parameters: bluna.hub.ParametersResponse | undefined,
): History[] | undefined {
  if (
    !unbondRequests ||
    unbondRequests.startFrom < 0 ||
    !allHistory ||
    !parameters
  ) {
    return undefined;
  }

  return unbondRequests.requests.map<History>(([index, amount]) => {
    const historyIndex: number = index - unbondRequests.startFrom;
    const matchingHistory = allHistory.history[historyIndex - 1];

    const blunaAmount = big(amount) as ubLuna<Big>;

    if (!matchingHistory) {
      return {
        blunaAmount,
      };
    }

    const { time, withdraw_rate } = matchingHistory;
    const { unbonding_period } = parameters;

    const lunaAmount = blunaAmount.mul(withdraw_rate) as uLuna<Big>;
    const requestTime = new Date(time * 1000);
    const claimableTime = new Date((time + unbonding_period) * 1000);

    return {
      blunaAmount,
      lunaAmount,
      requestTime,
      claimableTime,
    };
  });
}
