import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { registrarAcompanante } from '../services/api';

const RegistroAcompanante = ({ route, navigation }) => {
    const { invitadoId, asistentes, nombre } = route.params;
    console.log('Nombre recibido:', nombre);
    console.log('Número de acompañantes:', asistentes);

    const [listaAcompanantes, setListaAcompanantes] = useState([]);

    useEffect(() => {
        if (typeof asistentes === 'number' && asistentes > 0) {
            setListaAcompanantes(Array.from({ length: asistentes }, () => ({ nombre: '' })));
        }
    }, [asistentes]);


    const [loading, setLoading] = useState(false);

    const handleInputChange = (index, value) => {
        const newAcompanantes = [...listaAcompanantes];
        newAcompanantes[index].nombre = value;
        setListaAcompanantes(newAcompanantes);
    };

    const handleRegistro = async () => {
        if (listaAcompanantes.some(a => !a.nombre.trim())) {
            Alert.alert('Error', 'Ingresa el nombre de todos los acompañantes');
            return;
        }

        setLoading(true);
        try {
            for (const asistente of listaAcompanantes) {
                await registrarAcompanante({ nombre: asistente.nombre, invitadoId });
            }
            Alert.alert('Hecho', 'Se registraron los acompañantes.');
            navigation.navigate('Confirmado');
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al registrar acompañantes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.cardcontainer}>
                            <Text style={styles.titulo}>¡Estamos a pocos pasos!</Text>
                            <Text style={styles.texto}>
                                Añade a tus acompañantes.{' '}
                                <Text style={{ color: '#FE6B8B', fontWeight: 'bold' }}>
                                    Escribe sus nombres.
                                </Text>
                            </Text>
                            <Text style={styles.texto}>
                                Puedes añadir hasta{' '}
                                <Text style={{ color: '#4d4d4d', fontWeight: 'bold' }}>
                                    {asistentes}
                                </Text>{' '}
                                acompañantes.
                            </Text>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputRow}>
                                    <Text style={styles.label}>Tú</Text>
                                    <TextInput
                                        style={styles.inputTu}
                                        placeholder={route.params.nombre || 'Tu Nombre'}
                                        placeholderTextColor="#d1d1d1"
                                        keyboardType="text"
                                        editable={false}
                                        aria-disabled
                                    />
                                </View>
                                {listaAcompanantes.map((asistente, index) => (
                                    <View key={index} style={styles.inputRow}>
                                        <Text style={styles.label}>{index + 1}</Text>
                                        <TextInput
                                            placeholder="Nombre completo"
                                            placeholderTextColor={'#ffc4d1'}
                                            value={asistente.nombre}
                                            onChangeText={(value) => handleInputChange(index, value)}
                                            style={styles.input}
                                        />
                                    </View>
                                ))}

                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity
                                        style={styles.boton}
                                        onPress={handleRegistro}
                                        disabled={loading}
                                    >
                                        <Text style={styles.botonTexto}>
                                            {loading ? 'Registrando...' : 'Confirmar'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    inputTu: {
        color: '#ffa5b9',
        fontSize: 25
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
        color: '#fe6b8b'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fe6b8b',
        marginRight: 10,
        width: 30,
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
        marginBottom: 10,
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    boton: {
        backgroundColor: '#FE6B8B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 5,
    },
    botonTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    omitir: {
        backgroundColor: '#4d4d4d',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 5,
    },
    omitirTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default RegistroAcompanante;