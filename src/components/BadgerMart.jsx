import { Text, View,Button,Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import {useState, useEffect} from "react"
import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {

    const [items,setItems]=useState([])
    const [currentIndex,setCurrentIndex]=useState(0)
    const [basket,setBasket]=useState({})

    useEffect(()=>{
        fetch("https://cs571api.cs.wisc.edu/v2/rest/f26/hw7/items",{
            headers:{ 
                "X-CS571-ID":CS571.getBadgerId()}
        })
        .then(res=>res.json())
        .then(data=>{
            setItems(data)
            const initBasket={}
            data.forEach(product=>{
                initBasket[product.name]=0
            })

            setBasket(initBasket)
        })

    },[])
    const currentItem=items[currentIndex]
    let totalCost=0
    let totalQuantity=0
    items.forEach(product=>{
        const currentProductQuantity=basket[product.name]
        totalQuantity+=currentProductQuantity
        totalCost+=currentProductQuantity*product.price
    })
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        {items.length===0 ? (
            <Text>loading...</Text>
        ):(
            <>
            <Button title="Previous" onPress={()=>{setCurrentIndex(currentIndex-1)}} disabled={currentIndex===0}></Button>
        <Button title="Next" onPress={()=>setCurrentIndex(currentIndex+1)} disabled={currentIndex===items.length-1}></Button>
        <BadgerSaleItem
        item={currentItem}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button title="−" disabled={basket[currentItem.name]===0} onPress={()=>{
                const subtractingItems={...basket}
                subtractingItems[currentItem.name]-=1
                setBasket(subtractingItems)
            }}/>
            <Text>{basket[currentItem.name]}</Text>
            <Button title="+" disabled={basket[currentItem.name]===currentItem.upperLimit} onPress={()=>{
                const addingItems={...basket}
                addingItems[currentItem.name]+=1
                setBasket(addingItems)
            }}/>
        </View>
        <View>
            <Text>You have {totalQuantity} items costing you ${totalCost.toFixed(2)} in your cart!</Text>
            <Button title="Place Order" disabled={totalQuantity===0} onPress={() => {
                Alert.alert(
                    "Order Confirmed!",
                    `Your order contains ${totalQuantity} items and costs $${totalCost.toFixed(2)}!`
                );

                const emptyBasket = {};
                items.forEach(product => {
                    emptyBasket[product.name] = 0;
                });
                setBasket(emptyBasket);
                setCurrentIndex(0);
            }}></Button>
        </View>
        </>
    )}
    </View>
}
