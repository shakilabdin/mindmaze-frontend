import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
    return (
        <View style={styles.card}>
            
        </View>
    );
}

styles = StyleSheet.create({
    card: {
        padding: 20,
        shadowColor: 'black',
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        borderRadius: 10
    }
});

export default Card;
