import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Validacion from './screens/Validacion';
import HomeScreen from './screens/HomeScreen';
import Lista from './screens/Lista';
import RegistroAcompanante from './screens/regAcom';
import PaginaFinal from './screens/PaginaFinal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Validate" component={Validacion} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="RegistroAcompanante" component={RegistroAcompanante} />
        <Stack.Screen name="Completado" component={PaginaFinal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
