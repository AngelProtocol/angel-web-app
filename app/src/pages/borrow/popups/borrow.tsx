import React, { useState } from 'react';
import { fabricateBorrow } from '@anchor-protocol/anchor-js/fabricators';
import Box from 'deprecated/components/box';
import Button, { ButtonTypes } from 'deprecated/components/button';
import Input from 'deprecated/components/input';
import { ActionContainer } from '../../../deprecated/containers/action';
import { useWallet } from '../../../deprecated/hooks/use-wallet';
import { PopupChild } from '../../../deprecated/layout/popup-container';

interface PopupBorrowBorrowProps extends PopupChild {}

const PopupBorrowBorrow: React.FunctionComponent<PopupBorrowBorrowProps> = ({
  close,
}) => {
  const { address } = useWallet();
  const [borrowState, setBorrowState] = useState(0.0);

  return (
    <Box>
      <header>
        <dl>
          <dt>Borrow</dt>
          <dd>Borrow UST from Anchor</dd>
        </dl>
        <p>Borrow APR: 3.19%</p>
      </header>
      <div>
        <section>
          <header>Borrow Amount</header>
          <div>
            <Input
              textRight="UST"
              value={borrowState}
              onChange={(next) => setBorrowState(Number.parseFloat(next))}
            />
          </div>
          <footer>Safe Max: 10721UST</footer>
        </section>
        <section>
          <header>Borrow Limit Used</header>
          <div>
            <Input textRight="%" disabled={true} value={0.0} />
          </div>
        </section>
        {/* indicator */}
        indicator
      </div>

      <footer>
        <ActionContainer
          render={(execute) => (
            <Button
              type={ButtonTypes.PRIMARY}
              disabled={true}
              onClick={() =>
                execute(
                  fabricateBorrow({
                    address,
                    market: 'ust',
                    amount: borrowState,
                    withdrawTo: address,
                  }),
                ).then(close)
              }
            >
              Proceed
            </Button>
          )}
        />
      </footer>
    </Box>
  );
};

export default PopupBorrowBorrow;
