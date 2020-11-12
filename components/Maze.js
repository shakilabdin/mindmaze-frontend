import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

var generator = require('generate-maze');
var maze = generator(4);
console.log(maze)

function Maze(props) {

    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   
});

export default Maze;
