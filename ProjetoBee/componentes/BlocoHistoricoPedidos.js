import { useNavigation } from "@react-navigation/native";
import { Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function BlocoHistoricoPedidos({ foto, nomeProduto, valorTotal, nomeDoRestaurante, quantidadeProduto }) {
    const navigation = useNavigation()
    
    return (
        <View style={estilo.blocoMaior}>
            <View style={estilo.bloco}>
                <View style={estilo.blocoFoto}>
                    <Image source={foto} style={estilo.imagem} />
                    <Text style={estilo.nomeRestaurante}>{nomeDoRestaurante}</Text>
                </View>
                <Text style={estilo.textoProdutos}>Produto: {nomeProduto}</Text>
                <Text style={estilo.textoProdutos}>Quantidade: {quantidadeProduto}</Text>
                <Text style={estilo.textoTotalColorido}>Total: <Text style={estilo.valorTotal}>{valorTotal}</Text></Text>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    blocoMaior: {
        width: '100%',
        height: '20%',
        display: "flex",
        alignItems: "center",
        alignSelf: 'stretch',
        marginBottom: 30,
    },
    dataPedido: {
        fontSize: 18,
    },
    bloco: {
        backgroundColor: '#F2F2F2',
        marginBottom: 10,
        borderRadius: 10,
        width: '80%',
        padding: 15,

        shadowColor: "#FFBF00",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    blocoFoto: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    imagem: {
        width: 40,
        height: 50,
        borderRadius: 20,
        marginRight: 15,
    },
    nomeRestaurante: {
        color: '#FFBF00',
        fontSize: 25,
        fontWeight: "bold",
    },
    textoProdutos: {
        fontSize: 18,
        marginBottom: 8,
    },
    textoTotalColorido: {
        color: '#FFBF00',
        fontSize: 20,
        fontWeight: "bold",
    },
    valorTotal: {
        color: '#000',
        fontSize: 18.
    },
    numeroPedido: {
        marginTop: 11,
        fontSize: 15,
        textAlign: "right",
    },
})
