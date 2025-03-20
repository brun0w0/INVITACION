import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, KeyboardAvoidingView, Platform } from 'react-native';

export default function PaginaFinal2() {
    const [progress] = useState(new Animated.Value(100));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 0,
            duration: 7000,
            useNativeDriver: false,
        }).start();


        const timer = setTimeout(() => {
            location.reload();
        }, 7000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.cardcontainer}>
                <Text style={styles.titulo}>¡Felicidades!</Text>
                <Text style={styles.texto}>
                    Has confirmado tu asistencia y se han agregado tus acompañantes con éxito.
                </Text>
                <Text style={styles.texto}>
                    ¡Te esperamos en la fiesta! Y que no se te olvide el regalo.         
                </Text>
            </View>

            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, {
                    width: progress.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    })
                }]} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
    progressBarContainer: {
        width: '80%',
        height: 8,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginTop: 20,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FE6B8B',
    },
});
