import { StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HomeNavigation, LoginNavigation } from './src/navigation/NavigationHandler'
import { getAuthID } from './src/constants/AsyncStorage'

const App = () => {

  const [authId, setAuthId] = useState();

  useEffect(() => {
    getFromStorage();
  }, [])

  const getFromStorage = async () => {
    const id = await getAuthID();
    setAuthId(id);
  }

  return (
    <NavigationContainer>
      {
        authId != undefined &&
        (
          authId ?
            <HomeNavigation />
            :
            <LoginNavigation />
        )
      }
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})