import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity,
    Modal, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert
} from 'react-native';
import { getInvitados } from '../services/api';
import { getAcompanantes } from '../services/api';

export default function Lista({navigation}) {
    const [invitados, setInvitados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInvitado, setSelectedInvitado] = useState(null);
    const [searchText, setSearchText] = useState('');
    const itemsPerPage = 4;
    const [acompanantes, setAcompanantes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInvitados();
                setInvitados(data);
            } catch (error) {
                console.error('Error al obtener invitados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedInvitado?.id) {
            getAcompanantes(selectedInvitado.id)
                .then(data => {
                    console.log('Acompañantes:', data);
                    setAcompanantes(data);
                })
                .catch(console.error);
        }
    }, [selectedInvitado]);




    const filteredInvitados = invitados.filter((inv) =>
        inv.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const invitadosPaginados = filteredInvitados.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < filteredInvitados.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/invitado/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el invitado');
            }


            setInvitados(invitados.filter(inv => inv.id !== id));
            setSelectedInvitado(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Lista de Invitados ({invitados.length})</Text>

                        <Text style={styles.subtitle}>
                            <Text style={{ color: '#FE6B8B' }}>Ve</Text>, <Text style={{ color: '#ba9f2d' }}>edita</Text> o <Text style={{ color: '#d12c2c' }} >elimina</Text> invitados.
                        </Text>

                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar por nombre..."
                                placeholderTextColor="#999"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#FE6B8B" />
                    ) : filteredInvitados.length === 0 ? (
                        <Text style={styles.noResultsText}>No se encontraron invitados.</Text>
                    ) : (
                        <>
                            <FlatList
                                data={invitadosPaginados}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.card}>
                                        <View style={styles.cardContent}>
                                            <View>
                                                <Text style={styles.nombre}>👤 {item.nombre}</Text>
                                                <Text style={styles.telefono}>📱 {item.telefono}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.detailsButton}
                                                onPress={() => setSelectedInvitado(item)}
                                            >
                                                <Text style={styles.detailsButtonText}>Más detalles</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                contentContainerStyle={styles.listContent}
                                showsVerticalScrollIndicator={true}
                            />


                            <View style={styles.paginationContainer}>
                                <TouchableOpacity
                                    onPress={handlePrevPage}
                                    style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                                    disabled={currentPage === 1}
                                >
                                    <Text style={styles.paginationText}>← Anterior</Text>
                                </TouchableOpacity>

                                <Text style={styles.pageNumber}>Página {currentPage}</Text>

                                <TouchableOpacity
                                    onPress={handleNextPage}
                                    style={[styles.paginationButton, endIndex >= filteredInvitados.length && styles.disabledButton]}
                                    disabled={endIndex >= filteredInvitados.length}
                                >
                                    <Text style={styles.paginationText}>Siguiente →</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

                <Modal
                    visible={!!selectedInvitado}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setSelectedInvitado(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Detalles del Invitado</Text>
                            {selectedInvitado && (
                                <>
                                    <View style={styles.pastelBackground}>
                                        <Text style={styles.modalText}>👤 Nombre: {selectedInvitado.nombre}</Text>
                                    </View>

                                    <View style={styles.pastelBackground}>
                                        <Text style={styles.modalText}>📱 Número celular: {selectedInvitado.telefono}</Text>
                                    </View>

                                    <View style={styles.viewAcompanante}>
                                        <Text style={styles.modalText}>📋 Acompañantes: ({acompanantes.length})</Text>
                                        {acompanantes.length > 0 ? (
                                            acompanantes.map((acompanante, index) => (
                                                <View key={index}>
                                                    <Text style={styles.textoAcompanante}>
                                                        {acompanante}
                                                    </Text>
                                                </View>
                                            ))
                                        ) : (
                                            <View style={styles.pastelBackground}>
                                                <Text style={styles.textoAcompanante}>No se agregaron acompañantes.</Text>
                                            </View>
                                        )}
                                    </View>

                                    <TouchableOpacity onPress={() => handleDelete(selectedInvitado.id)} style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Eliminar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.replace('Editar', { id: selectedInvitado.id })} style={styles.editButton}>
                                        <Text style={styles.editButtonText}>Editar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setSelectedInvitado(null)} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>Cerrar</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    nombre: {
        color: "#FE6B8B",
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center', // Alinear el contenido en el centro
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        width: '100%',
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        color: "#FE6B8B",
        fontWeight: '400',
        outlineWidth: 0,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsButton: {
        backgroundColor: '#FE6B8B',
        padding: 10,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '70%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'left',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#848484',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 30,
    },
    paginationButton: {
        backgroundColor: '#FE6B8B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    paginationText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pageNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#777',
        marginTop: 20,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#d12c2c',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#ba9f2d',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteAllButton: {
        backgroundColor: '#d12c2c',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    deleteAllButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    viewAcompanante: {
        padding: 10,
        borderWidth: 0,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#ffe5ea'
    },
    textoAcompanante: {
        marginLeft: 28,
        fontSize: 18,
        color: '#333',
    },
    pastelBackground: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
});