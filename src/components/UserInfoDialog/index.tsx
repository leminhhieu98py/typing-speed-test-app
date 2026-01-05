import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes';

import { useActions } from './useActions';

const UserInfoDialog = () => {
  const { handleChangeUserInfo, handleClickSave, isOpen, isSavable } = useActions();

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content maxWidth='30rem'>
        <Dialog.Title>Your profile</Dialog.Title>
        <Dialog.Description
          size='1'
          mb='4'
          color='gray'
        >
          This information will be used to share your typing test result with others.
        </Dialog.Description>

        <Flex
          direction='column'
          gap='3'
        >
          <label>
            <Text
              as='div'
              size='2'
              mb='1'
              weight='bold'
            >
              Nickname
            </Text>
            <TextField.Root
              placeholder='Enter your cool nickname'
              onChange={(e) => handleChangeUserInfo('name', e.target.value)}
            />
          </label>
          <label>
            <Text
              as='div'
              size='2'
              mb='1'
              weight='bold'
            >
              Gender
            </Text>
            <Select.Root
              size='2'
              onValueChange={(value: string) => handleChangeUserInfo('gender', value)}
            >
              <Select.Trigger
                placeholder='Select your gender'
                style={{ width: '100%' }}
              />
              <Select.Content>
                <Select.Group>
                  <Select.Item value='male'>Male</Select.Item>
                  <Select.Item value='female'>Female</Select.Item>
                  <Select.Item value='other'>Other</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex
          gap='3'
          mt='4'
          justify='end'
        >
          <Button
            disabled={!isSavable}
            onClick={handleClickSave}
          >
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserInfoDialog;
