import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import AddPetScreen from './src/screens/AddPetScreen';
import PetProfileScreen from './src/screens/PetProfileScreen';
import SelectPetScreen from './src/screens/SelectPetScreen';
import HealthCheckScreen from './src/screens/HealthCheckScreen';
import CheckResultScreen from './src/screens/CheckResultScreen';
import SymptomCheckerScreen from './src/screens/SymptomCheckerScreen';
import FirstAidScreen from './src/screens/FirstAidScreen';
import DangerousFoodScreen from './src/screens/DangerousFoodScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#F5F5F5' },
  headerTintColor: '#2E7D32',
  headerTitleStyle: { fontWeight: '600' as const, color: '#333' },
  headerShadowVisible: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: 'Новый питомец' }} />
        <Stack.Screen name="PetProfile" component={PetProfileScreen} options={{ title: 'Профиль' }} />
        <Stack.Screen name="SelectPetForCheck" component={SelectPetScreen} options={{ title: 'AI-проверка' }} />
        <Stack.Screen name="HealthCheck" component={HealthCheckScreen} options={{ title: 'Проверка' }} />
        <Stack.Screen name="CheckResult" component={CheckResultScreen} options={{ title: 'Результат' }} />
        <Stack.Screen name="SymptomChecker" component={SymptomCheckerScreen} options={{ title: 'Симптомы' }} />
        <Stack.Screen name="FirstAid" component={FirstAidScreen} options={{ title: 'Первая помощь' }} />
        <Stack.Screen name="DangerousFood" component={DangerousFoodScreen} options={{ title: 'Опасные продукты' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
