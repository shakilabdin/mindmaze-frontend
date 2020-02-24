import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Picker } from "react-native";
import Card from "../components/Card";

const MenuScreen = () => {
    
    return (
        <View style={styles.imageContainer}>
            <Picker
                style={{ height: 50, width: 100 }}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    );
};

styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MenuScreen;
