import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_MONTH = gql`
mutation InsertMonths($name: String, $userId: Int) {
    insert_months(objects: {name: $name, userId: $userId}) {
      affected_rows
      returning {
        id
              name
              userId
      }
    }
  }  
`;

const AddMonth = () => {
    const [month, setMonth] = useState('');
    const [userId, setUserId] = useState('');

    const handleMonthChange = (text) => {
        setMonth(text);
    };
    const handleUserChange = (text) => {
        setUserId(text);
    };

    const [addMonth, { loading, error }] = useMutation(ADD_MONTH);

    const handleAddMonth = async () => {
        try {
            console.log('try Block==', addMonth);
            const result = await addMonth({
                variables: {
                    name: month,
                    userId: userId
                },
            });

            console.log('Month added:', result);
            setMonth('')
            setUserId('')

        } catch (error) {
            console.log('Error adding month:', error);
        }
    };

    return (
        <Center w="100%" safeArea>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: 'warmGray.50' }}>
                    Add Month of User
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Month</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Month"
                            onChangeText={handleMonthChange}
                            value={month}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>User Id</FormControl.Label>
                        <Input
                            type='text'
                            placeholder="Enter User Id"
                            onChangeText={handleUserChange}
                            value={userId}
                        />
                    </FormControl>

                    <Button mt="2" colorScheme="indigo" onPress={handleAddMonth}>
                        Add Month
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default AddMonth;


