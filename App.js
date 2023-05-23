import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation";
import { ApolloProvider } from '@apollo/client';
import client from './src/api/graphql';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <MyTabs />
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}