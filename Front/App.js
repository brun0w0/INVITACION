import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Validacion from './screens/Validacion';
import HomeScreen from './screens/HomeScreen';
import Lista from './screens/Lista';
import RegistroAcompanante from './screens/regAcom';
import PaginaFinal from './screens/PaginaFinal';
import InicioScreen from './screens/InicioScreen';
import Buscar from './screens/Buscar';
import PaginaFinal2 from './screens/PaginaFinal2';
import EditarInvitado from './screens/EditarInvitado';
import PaginaFinal3 from './screens/PaginaFinal3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Confirmando asistencia" component={Buscar} />
        <Stack.Screen name="Panel de control" component={HomeScreen} />
        <Stack.Screen name="Validación" component={Validacion} />
        <Stack.Screen name="Lista de invitados" component={Lista} />
        <Stack.Screen name="Registro de acompañante" component={RegistroAcompanante} />
        <Stack.Screen name="Completado" component={PaginaFinal} />
        <Stack.Screen name="Confirmado" component={PaginaFinal2} />
        <Stack.Screen name="Hecho" component={PaginaFinal3} />
        <Stack.Screen name="Editar" component={EditarInvitado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
