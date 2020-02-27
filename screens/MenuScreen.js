import React, { useState } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, Button } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

const MenuScreen = props => {
    let data = [
        { value: "General Knowledge" },
        { value: "Books" },
        { value: "Movies" },
        { value: "Video Games" },
        { value: "History" }
    ];

    function changeHandler(e) {
        let newCat = e
        props.categories.forEach(category => {
            if(category.name === newCat) {
                props.setChosenCategory(category.id)
            }
        })
    }

    console.log(props.categories)

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/border.png")}
                resizeMode="stretch"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <Text style={styles.gameOptions}>Game Options</Text>
                <View style={styles.rect}>
                    <Dropdown label="Select Category" data={data} onChangeText={changeHandler}/>
                    <Button title='Start Game'/>
                    <Button color='red' title='Cancel'/>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 896,
        height: 414,
        backgroundColor: "#f5f5dc",
        alignSelf: "center"
    },
    image_imageStyle: {},
    gameOptions: {
        fontSize: 30,
        marginTop: 49,
        marginLeft: 340
    },
    rect: {
        width: 513,
        height: 210,
        marginTop: 23,
        marginLeft: 179
    }
});

export default MenuScreen;
