import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { getIdPorNumero, getInvitado } from '../services/api';

export default function VerificacionUsuario({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerificar = async () => {
        setError('');

        if (!nombre || !telefono) {
            setError('Por favor completa los campos.');
            return;
        }

        if (telefono.length !== 10) {
            setError('El número debe tener 10 dígitos.');
            return;
        }

        setLoading(true);
        try {
            console.log('Número enviado:', telefono);
            const id = await getIdPorNumero(telefono);
            console.log('ID recibido:', id);

            const invitado = await getInvitado(id);
            console.log('Invitado recibido:', invitado);

            if (invitado && invitado.telefono === telefono) {
                navigation.navigate('Registro de acompañante', {
                    invitadoId: invitado.id,
                    asistentes: invitado.asistentes,
                    nombre: invitado.nombre
                });
            } else {
                setError('No estás registrado como invitado principal.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Número no encontrado.');
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
                <Text style={styles.titulo}>Confirma tu asistencia</Text>
                <Text style={styles.texto}>
                    Por favor, introduce tu <Text style={{ color: '#FE6B8B', fontWeight: 'bold' }}>nombre</Text> en el campo correspondiente para continuar.
                </Text>
                <Text style={styles.texto}>
                    De igual manera introduce tu <Text style={{ color: '#4d4d4d', fontWeight: 'bold' }}>número celular</Text> para continuar con el proceso.
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                        placeholderTextColor="#d1d1d1"
                        keyboardType="default"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número"
                        value={telefono}
                        onChangeText={(text) => {
                            if (/^\d*$/.test(text) && text.length <= 10) {
                                setTelefono(text);
                            }
                        }}
                        placeholderTextColor="#d1d1d1"
                        keyboardType="phone-pad"
                    />
                    {error ? <Text style={styles.errorTexto}>{error}</Text> : null}
                    <TouchableOpacity
                        onPress={handleVerificar}
                        disabled={loading || !nombre || telefono.length !== 10}
                        style={[styles.boton, (loading || !nombre || telefono.length !== 10) && styles.botonDeshabilitado]}
                    >
                        <Text style={styles.botonTexto}>{loading ? 'Verificando...' : 'Verificar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    errorTexto: {
        color: '#FF0000',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    boton: {
        backgroundColor: '#FE6B8B',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    botonDeshabilitado: {
        backgroundColor: '#d1d1d1',
    },
    botonTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
