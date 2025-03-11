import axios from 'axios';

export const registroInvitado = async (nombre, telefono) => {
    try {
        const response = await axios.post('http://localhost:3000/invitado/registar', {
            nombre,
            telefono,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const registrarAcompanante = async (data) => {
    if (!data.invitadoId) {
        console.error('Error: invitadoId es undefined');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/acompanante/registrar', data);
        return response.data;
    } catch (error) {
        console.error('Error al registrar acompañante:', error.response?.data || error.message);
        throw error;
    }
};

export const getInvitados = async () => {
    try {
        const response = await axios.get('http://localhost:3000/invitado');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener los invitados';
    }
};

export const editarInvitado = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:3000/invitado/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al actualizar el invitado.';
    }
};

export const getAcompanantes = async (invitadoId) => {
    const response = await fetch(`http://localhost:3000/acompanante/${invitadoId}/nombres`);
    if (!response.ok) throw new Error("No se encontraron acompañantes");
    return response.json();
};


