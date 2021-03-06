import { ActionButton } from '@terra-dev/neumorphism-ui/components/ActionButton';
import { useAlert } from '@terra-dev/neumorphism-ui/components/useAlert';
import { useCallback } from 'react';

export default {
  title: 'components/useAlert',
};

export const Basic = () => {
  const [openAlert, alertElement] = useAlert();

  const fn = useCallback(async () => {
    await openAlert({ title: 'Title', description: 'Description' });
  }, [openAlert]);

  return (
    <div>
      <ActionButton style={{ width: 200 }} onClick={() => fn()}>
        Open Alert
      </ActionButton>
      {alertElement}
    </div>
  );
};
