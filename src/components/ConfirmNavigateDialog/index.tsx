import { AlertDialog, Button, Flex } from '@radix-ui/themes';

import { useActions } from './useActions';

const ConfirmNavigateDialog = () => {
  const { typingState, handleCancel, handleConfirm } = useActions();

  return (
    <AlertDialog.Root open={typingState?.showConfirmNavigate}>
      <AlertDialog.Content maxWidth='450px'>
        <AlertDialog.Title>Stop your challenge</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure? This navigation will delete your current result and can not be reverted
        </AlertDialog.Description>
        <Flex
          gap='3'
          mt='4'
          justify='end'
        >
          <AlertDialog.Cancel>
            <Button
              variant='soft'
              color='gray'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant='solid'
              color='red'
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmNavigateDialog;
