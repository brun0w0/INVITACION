import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.gradientContainer}>
            <View style={styles.cardContainer}>
                <Text style={styles.titulo}>Panel de control</Text>
                <Text style={styles.texto}>Controla la información y accede a varias opciones para mantener un orden en tu fiesta.</Text>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Validate')}
                >
                    <Text style={styles.botonTexto}>Agregar invitado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Lista')}
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
        backgroundColor: '#F4F4F4',
    },
    cardContainer: {
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        width: 500,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titulo: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '400',
    },
    texto: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '200',
    },
    boton: {
        backgroundColor: '#FE6B8B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: 400,
        alignItems: 'center',
    },

    botonTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
