import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registroInvitado } from '../services/api';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Validacion() {
    const [nombre, setNombre] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();

    const handleNumeroCelularChange = (text) => {
        if (text.length <= 10) {
            setNumeroCelular(text);
            setError('');
        } else {
            setError('Debe ingresar exactamente 10 números.');
        }
    };

    const handleSiguiente = async () => {
        if (loading) return;

        if (!nombre.trim() || !numeroCelular.trim()) {
            setError('Es necesario completar todos los campos.');
            return;
        }

        if (!/^\d+$/.test(numeroCelular) || numeroCelular.length !== 10) {
            setError('Ingresa un número válido.');
            return;
        }

        setLoading(true);
        try {
            console.log('Enviando datos:', { nombre, numeroCelular });
            const response = await registroInvitado(nombre, numeroCelular);
            console.log('Respuesta de la API:', response);

            const invitadoId = response.id;
            console.log('ID del invitado:', invitadoId);

            Alert.alert('Registro correcto', 'Tu registro se ha completado exitosamente.');
            setNombre('');
            setNumeroCelular('');

            navigation.navigate('RegistroAcompanante', { invitadoId, nombre });
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('Ocurrió un error al registrarte. Intenta más tarde.');
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
                <Text style={styles.titulo}>¡Primero lo primero!</Text>
                <Text style={styles.texto}>
                    Completa los campos para poder terminar tu registro:
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        placeholderTextColor="#d1d1d1"
                        keyboardType="default"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número celular"
                        placeholderTextColor="#d1d1d1"
                        keyboardType="numeric"
                        value={numeroCelular}
                        onChangeText={handleNumeroCelularChange}
                        maxLength={10}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={handleSiguiente}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.botonTexto}>Siguiente</Text>
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
                confirmText="OK"
                confirmButtonColor="#FE6B8B"
                onConfirmPressed={() => setShowErrorAlert(false)}
            />
        </KeyboardAvoidingView>
    );
}

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
    errorText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
    },
});
