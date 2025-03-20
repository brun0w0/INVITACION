import { View, TouchableOpacity, Text } from 'react-native';

export default function InicioScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Bienvenido</Text>
                <Text style={styles.texto}>
                    ¡Hola! Bienvenido a la aplicación de registro de invitados.
                </Text>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Panel de control')}
                >
                    <Text style={styles.botonTexto}>Administrador</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Confirmando asistencia')}
                >
                    <Text style={styles.botonTexto}>Confirmar asistencia</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20,
    },
    texto: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    boton: {
        backgroundColor: '#FE6B8B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: 350,
        alignItems: 'center',
    },
    botonTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        width: 450,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
};