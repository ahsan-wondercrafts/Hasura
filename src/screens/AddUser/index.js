import { Box, Button, Center, FormControl, Heading, Input, VStack, Text } from 'native-base';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_USER = gql`
mutation InsertUsers($name: String, $phone_no: numeric) {
    insert_users(objects: {name: $name, phone_no: $phone_no}) {
      affected_rows
      returning {
        id
              name
              created_at
              phone_no
      }
    }
  }
`;

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePhoneNoChange = (text) => {
        setPhoneNo(text);
    };

    const [addUser, { loading, error }] = useMutation(ADD_USER);

    const handleAddUser = async () => {
        try {
            const result = await addUser({
                variables: {
                    name: username,
                    phoneNo: phoneNo,

                },
            });

            console.log('User added:', result);

        } catch (error) {

            console.log('Error adding user:', error);
        }
    };

    return (
        <Center w="100%" safeArea>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: 'warmGray.50' }}>
                    Add Users to database
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>User Name</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Name"
                            onChangeText={handleUsernameChange}
                            value={username}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Phone No."
                            onChangeText={handlePhoneNoChange}
                            value={phoneNo}
                        />
                    </FormControl>

                    <Button mt="2" colorScheme="indigo" onPress={handleAddUser} disabled={loading}>
                        Add User
                    </Button>

                    {error && (
                        <Text color="red.500" fontSize="sm">
                            Error adding user
                        </Text>
                    )}
                </VStack>
            </Box>
        </Center>
    );
};

export default AddUser;
