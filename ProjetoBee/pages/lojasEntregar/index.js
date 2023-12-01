import React, { useEffect, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import NavBar2 from "../../componentes/NavBar2";
import Menu from '../../componentes/Menu'
import BlocoLoja from "../../componentes/BlocoLoja";
import bee from '../../assets/bee.png';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


export default function LojasEntregar() {
    const [cep, setCep] = useState()
    const [restaurantes, setRestaurantes] = useState([]);
    const firestore = getFirestore();
    const [imageUrl, setImageUrl] = useState([]);

    // Função para buscar dados de uma coleção
    async function fetchUserData() {
        const querySnapshot = await getDocs(collection(firestore, 'lojas')); // Substitua 'usuarios' pelo nome da sua coleção

        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            console.log(doc.data()['nomeRestaurante'])
        });
    }

    useEffect(() => {
        async function fetchUserData1() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'lojas'));
                const restaurantesData = [];

                querySnapshot.forEach(async (doc) => {
                    console.log(doc.id, ' => ', doc.data());
                    const restaurante = doc.data();
                    restaurantesData.push({
                        id: doc.id,
                        nomeRestaurante: restaurante.nomeRestaurante,
                        descricao: restaurante.descricao,
                        tipoProduto: restaurante.tipoProduto,
                    });

                    const getDownloadUrl = async () => {
                        try {
                            const storageRef = ref(storage, 'imagens/' + restaurante.nomeRestaurante + '.png'); // Substitua pelo caminho da sua imagem
                            const url = await getDownloadURL(storageRef);
                            setImageUrl(url);
                            console.log(url, 'url');
                        } catch (error) {
                            console.error('Erro ao obter URL de download:', error);
                        }
                    };
                    getDownloadUrl()
                });

                setRestaurantes(restaurantesData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchUserData1();


    }, []);
    const storage = getStorage();
    const imageBee = useState()


    return (
        <View style={{
            alignItems: 'center',
        }}>
            <NavBar2 texto={'Seus pedidos hoje!'} />
            <Menu texto1={'Para entregar'} texto2={'Entregues'} />
            <View>
                <Text style={{ color: '#F8B655', fontSize: 25, marginBottom: 10 }}>Lojas</Text>
                {restaurantes.map((restaurante) => (
                    <BlocoLoja
                        key={restaurante.id}
                        foto={{ uri: imageBee }}
                        nomeDoRestaurante={restaurante.nomeRestaurante}
                        descricaoRestaurante={restaurante.descricao}
                        vendemosRestaurante={restaurante.tipoProduto}
                        navegarPara={'Produtos'}
                    />
                ))}
            </View>
        </View>
    );
}
