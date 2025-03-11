import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { registrarAcompanante } from '../services/api';

export default function RegistroAcompanante() {
    const route = useRoute();
    const navigation = useNavigation();
    const { invitadoId } = route.params;
    const nombre = route.params?.nombre || 'Tú';
    const [acompanantes, setAcompanantes] = useState(['', '', '']);
    const [loading, setLoading] = useState(false);

    const handleRegistro = async () => {
        if (acompanantes.every((nombre) => !nombre.trim())) {
            Alert.alert('Error', 'Ingresa por lo menos a un acompañante.');
            return;
        }

        setLoading(true);
        try {
            for (const nombre of acompanantes) {
                if (nombre.trim()) {
                    console.log('Registrando acompañante:', { nombre, invitadoId });
                    await registrarAcompanante({ nombre, invitadoId });
                }
            }
            Alert.alert('Éxito', 'Acompañantes registrados correctamente.');
            navigation.navigate('Completado');
        } catch (error) {
            console.error('Error en handleRegistro:', error);
            Alert.alert('Error', error.message || 'Ocurrió un error al registrar los acompañantes.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (index, value) => {
        const newAcompanantes = [...acompanantes];
        newAcompanantes[index] = value;
        setAcompanantes(newAcompanantes);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.cardcontainer}>
                <Text style={styles.titulo}>¡Estamos a pocos pasos!</Text>
                <Text style={styles.texto}>
                    Añade hasta 3 acompañantes. <span style={{ color: '#FE6B8B', fontWeight: 'bold' }} >Este apartado es opcional.</span>
                </Text>
                <Text style={styles.texto}>
                    Si deseas puedes darle a <span style={{ color: '#4d4d4d', fontWeight: 'bold' }}>Omitir</span> sin agregar acompañantes.
                </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Tú</Text>
                        <TextInput
                            style={styles.inputTu}
                            placeholder={nombre}
                            placeholderTextColor="#d1d1d1"
                            keyboardType="text"
                            editable={false}
                            aria-disabled
                        />
                    </View>
                    {[0, 1, 2].map((index) => (
                        <View style={styles.inputRow} key={index}>
                            <Text style={styles.label}>{index + 1}.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre completo"
                                placeholderTextColor="#d1d1d1"
                                keyboardType="text"
                                value={acompanantes[index]}
                                onChangeText={(text) => handleInputChange(index, text)}
                            />
                        </View>
                    ))}
                    <View style={styles.botonesContainer}>
                        <TouchableOpacity style={styles.boton} onPress={handleRegistro} disabled={loading}>
                            <Text style={styles.botonTexto}>{loading ? 'Registrando...' : 'Confirmar'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.omitir} onPress={() => navigation.navigate('Completado')} >
                            <Text style={styles.omitirTexto} >Omitir</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 1,
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