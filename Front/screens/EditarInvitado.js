import { useEffect, useState } from "react";
import { editarInvitado, getInvitado } from "../services/api";
import { View, Text, Alert, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const EditarInvitado = ({ route, navigation }) => {
    const { id } = route.params;
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [asistentes, setAsistentes] = useState('');
    const [loading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cantAsis, setCantAsis] = useState(0);
    const [showAsistentesAlert, setShowAsistentesAlert] = useState(false); // Nuevo estado para el alert de asistentes

    useEffect(() => {
        const cargarInvitado = async () => {
            setLoading(true);
            try {
                const invitado = await getInvitado(id);
                setNombre(invitado.nombre);
                setTelefono(invitado.telefono);
                setAsistentes(invitado.asistentes.toString());
                setCantAsis(invitado.asistentes);
            } catch (error) {
                setErrorMessage('Error al cargar los datos.');
                setShowErrorAlert(true);
            } finally {
                setLoading(false);
            }
        };

        cargarInvitado();
    }, [id]);

    const handleGuardar = async () => {
        if (!nombre || !telefono || !asistentes) {
            setErrorMessage('Por favor ingresa los datos.');
            setShowErrorAlert(true);
            return;
        }

        const cantidad = parseInt(asistentes, 10);
        if (isNaN(cantidad)) {
            setErrorMessage('Ingresa un número válido');
            setShowErrorAlert(true);
            return;
        }

        if (cantidad < cantAsis) {
            setShowAsistentesAlert(true);
            return;
        }

        setLoading(true);
        try {
            await editarInvitado(id, { nombre, telefono, asistentes: cantidad });
            Alert.alert('Hecho', 'Invitado actualizado correctamente.');
            navigation.navigate('Hecho');
        } catch (error) {
            setErrorMessage('Error al actualizar el invitado.');
            setShowErrorAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.cardcontainer}>
                <Text style={styles.titulo}>Editar invitado</Text>
                <Text style={styles.texto}>Modifica los datos del invitado:</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        placeholderTextColor="#d1d1d1"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número celular"
                        placeholderTextColor="#d1d1d1"
                        keyboardType="numeric"
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número de acompañantes"
                        placeholderTextColor="#d1d1d1"
                        keyboardType="numeric"
                        value={asistentes}
                        onChangeText={setAsistentes}
                        maxLength={10}
                    />
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={handleGuardar}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.botonTexto}>Guardar cambios</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <AwesomeAlert
                show={showErrorAlert}
                showProgress={false}
                title="Ups, hubo un problema."
                message={errorMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Aceptar"
                confirmButtonColor="#FE6B8B"
                onConfirmPressed={() => setShowErrorAlert(false)}
            />

            <AwesomeAlert
                show={showAsistentesAlert}
                showProgress={false}
                title="Cantidad no permitida"
                message={`No puedes reducir el número de acompañantes a menos de ${cantAsis}.`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#FE6B8B"
                onConfirmPressed={() => setShowAsistentesAlert(false)}
            />
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FE6B8B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20,
    },
    cardcontainer: {
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    texto: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '200',
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        color: "#fe6b8b",
        fontWeight: 'bold',
        width: '80%',
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#FE6B8B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default EditarInvitado;
