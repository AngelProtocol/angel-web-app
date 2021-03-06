import type { Rate, uUST } from '@anchor-protocol/types';
import { TxFailedError } from 'base/errors/TxFailedError';

export interface StringifiedTxResult {
  fee: string;
  gasAdjustment: string;
  id: number;
  msgs: string[];
  origin: string;
  purgeQueue: boolean;
  result: {
    height: number;
    raw_log: string;
    txhash: string;
  };
  success: boolean;
}

export interface TxResult {
  fee: {
    amount: [
      {
        amount: uUST<string>;
        denom: 'uusd';
      },
    ];
    gas: uUST<string>;
  };
  gasAdjustment: Rate<string>;
  id: number;
  msgs: {
    type: string;
    value: unknown;
  }[];
  origin: string;
  purgeQueue: boolean;
  result: {
    height: number;
    raw_log: string;
    txhash: string;
  };
  success: boolean;
}

export function findTxResult(values: any[]): TxResult | undefined {
  return values.find((value) => {
    return (
      value &&
      Array.isArray(value.msgs) &&
      'fee' in value &&
      'gasAdjustment' in value &&
      'id' in value &&
      'origin' in value &&
      'purgeQueue' in value &&
      'result' in value &&
      'success' in value
    );
  }) as TxResult | undefined;
}

export function parseTxResult({
  fee,
  gasAdjustment,
  id,
  msgs,
  origin,
  purgeQueue,
  result,
  success,
}: StringifiedTxResult): TxResult {
  const txResult: TxResult = {
    fee: JSON.parse(fee),
    gasAdjustment: gasAdjustment as Rate,
    id,
    msgs: msgs.map((msg) => JSON.parse(msg)),
    origin,
    purgeQueue,
    result,
    success,
  };

  if (!success) {
    throw new TxFailedError(txResult);
  }

  return txResult;
}
