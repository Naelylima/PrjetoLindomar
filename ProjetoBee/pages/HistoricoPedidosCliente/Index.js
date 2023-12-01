import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import estilo from "./HistoricoPedidosStyle.js";
import { useNavigation } from "@react-navigation/native";
import TopoTelasIniciais from "../../componentes/TopoTelasIniciais.js";
import SobreNosLoja from "../../componentes/sobrenosLoja.js";
import BlocoHistoricoPedidos from "../../componentes/BlocoHistoricoPedidos.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function HistoricoPedidosCliente() {
    const navigation = useNavigation()
    const [compras, setCompras] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
        async function fetchUserData1() {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'compras'));
                const comprasData = [];

                querySnapshot.forEach(async (doc) => {
                    console.log("AQUIIIIIIIIIIII", doc.id, ' => ', doc.data());
                    const compras = doc.data();
                    comprasData.push({
                        id: doc.id,
                        lista: compras.lista,
                        total: compras.total,
                        nomeRestaurante: compras.nomeRestaurante
                    });
                });

                setCompras(comprasData);
            } catch (error) {
                Alert.alert('Um erro aconteceu.')
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchUserData1();

    }, []);

    return (
        <ScrollView>
            <View style={estilo.centralizandoConteudo}>
                <TopoTelasIniciais />
                <SobreNosLoja textoUm='Carrinho' textoDois='Histórico de Pedidos' largura='70%' />
                <Text style={estilo.titulo}>Histórico de Pedidos</Text>
                {compras.map((compra) => (
                    <BlocoHistoricoPedidos
                        key={compra.id}
                        nomeDoRestaurante={compra.nomeRestaurante}
                        nomeProduto={compra.lista[0].name}
                        valorTotal={compra.total}
                        quantidadeProduto={compra.lista[0].quantity} />
                ))}
            </View>
        </ScrollView>
    )
}
