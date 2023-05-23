import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_MONTH = gql`
  mutation InsertMonths($name: String) {
    insert_months(objects: { name: $name }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;

const AddMonth = () => {
  const [month, setMonth] = useState('');

  const handleMonthChange = (text) => {
    setMonth(text);
  };

  const [addMonth, { loading, error }] = useMutation(ADD_MONTH);

  const handleAddMonth = async () => {
    try {
      const result = await addMonth({
        variables: {
          name: month,
        },
      });

      console.log('Month added:', result);

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

          <Button mt="2" colorScheme="indigo" onPress={handleAddMonth}>
            Add Month
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default AddMonth;

{/* <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                            type='text'
                            placeholder="Enter Name"
                            onChangeText={handlePhoneNoChange}
                            value={phoneNo}
                        />
                    </FormControl> */}
