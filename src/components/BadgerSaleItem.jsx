import { Text, View,Image } from "react-native";
import CS571 from '@cs571/mobile-client'

export default function BadgerSaleItem(props) {
    

    return <View>
        <Image style={{width:150,height:100}} source={{uri:props.item.imgSrc}}></Image>
        <Text>{props.item.name}</Text>
        <Text>${props.item.price.toFixed(2)}</Text>
        <Text>You can order up to {props.item.upperLimit} units</Text>
    </View>
}
