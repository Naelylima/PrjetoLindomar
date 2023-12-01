import React, { useEffect, useState } from "react";
import { Image, Text, TouchableHighlight, View, StyleSheet } from "react-native";
import { storage } from '../pages/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, getFirestore } from "firebase/firestore";
 
export default function Produto({ products, addToCart }) {
    const [imagens, setImagens] = useState([]);
    const firestore = getFirestore();
 
    useEffect(() => {
        async function fetchUserData() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'produtos'));
                const produtoData = [];
 
                for (const doc of querySnapshot.docs) {
                    const produto = doc.data();
                    produtoData.push({
                        id: doc.id,
                        nome: produto.nome || '',
                        descricao: produto.descricao || '',
                        estoque: produto.estoque || '',
                        quantidade: produto.quantidade || '',
                        valor: produto.valor || ''
                    });
                }
 
                for (const produto of produtoData) {
                    const getDownloadUrl = async () => {
                        try {
                            const storageRef = ref(storage, `imagens/${produto.nome}.png`);
                            const url = await getDownloadURL(storageRef);
                            console.log(url, ' aq');
                            return url;
                        } catch (error) {
                            console.error('Erro ao obter URL de download:', error);
                            return null;
                        }
                    };
 
                    const imageUrl = await getDownloadUrl();
                    setImagens((prevImagens) => [...prevImagens, imageUrl]);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
 
        fetchUserData();
    }, [firestore]);
 
    return (
        <View style={estilo.informacoes}>
          {products.map((product, index) => (
            <View style={estilo.tudo} key={product.id}>
              <View style={estilo.blocoImage}>
                {imagens.length > index && (
                  <Image source={{ uri: imagens[index] }} style={estilo.imagem} />
                )}
              </View>
              <View style={estilo.info}>
                <Text>{product.name}</Text>
                <Text>{product.descricao}</Text>
                <Text>${product.price.toFixed(2)}</Text>
                <TouchableHighlight
                  style={estilo.botao}
                  onPress={() => addToCart(product)}>
                  <Text style={estilo.textoBotao}>Adicionar</Text>
                </TouchableHighlight>
              </View>
            </View>
          ))}
        </View>
      );
     
}
 
const estilo = StyleSheet.create({
    informacoes: {
        width: '100%',
        padding:15
    },
    nomeRestaurante: {
        color: "#F8B655",
        fontSize: 25,
    },
    descricao: {
        color: "#000",
        fontSize: 15,
    },
    valor: {
        color: "#000",
        fontSize: 15,
    },
    botao: {
        marginTop: 20,
        backgroundColor: "#F8B655",
        width: 80,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        shadowColor: "#F8B655",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 10,
 
    },
    textoBotao: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    barra: {
        width: '100%',
        height: 4,
        borderColor: "#F8B655",
        borderWidth: 2,
        borderRadius: 50,
    },
    imagem: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
 
    tudo: {
        display: 'flex',
        width: '100%',
        flexDirection:'row',
        marginBottom:10
    },
    info: {
        width: '45%',
    },
    blocoImage:{
        width:'45%',
    }
})