import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.gradientContainer}>
            <View style={styles.cardContainer}>
                <Text style={styles.titulo}>Panel de control</Text>
                <Text style={styles.texto}>Controla la información y accede a varias opciones para mantener un orden en tu fiesta.</Text>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Validación')}
                >
                    <Text style={styles.botonTexto}>Agregar invitado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Lista de invitados')}
                >
                    <Text style={styles.botonTexto}>Lista de Invitados</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4e4e4e',
    },
    cardContainer: {
        backgroundColor: '#848484',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        width: 450,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '400',
        color: '#fff'
    },
    texto: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '200',
        color: '#fff'
    },
    boton: {
        backgroundColor: '#2c2c2c',
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
    }
});
