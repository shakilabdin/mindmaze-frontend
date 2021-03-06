import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function RedButton(props) {
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
            <Text style={styles.caption}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F44336",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 5
    },
    caption: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center"
    }
});

export default RedButton;
