import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from '../components/Card'

API = "http://localhost:3000/categories";

function MenuScreen() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(API)
            .then(resp => resp.json())
            .then(result => console.log(result));
    });

    return (
        <View style={styles.card}>
            <Text style={{color: 'red'}}>Hello</Text>
        </View>
    );
}

styles = StyleSheet.create({
    card: {
        height: '60%',
        width: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default MenuScreen;
