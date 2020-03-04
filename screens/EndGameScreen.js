import React, {useEffect} from "react";
import { StyleSheet, View, Image, ImageBackground, Text, Button } from "react-native";
// import Canvas from 'react-native-canvas';

const API = "http://localhost:3000/";

const EndGameScreen = props => {

    function quitHandler() {
        props.setUser({ id: 0, name: "" })
        props.goHome()
    }

    useEffect(() => {
        let postObj = {
            user_id: props.user.user,
            category_id: props.chosenCategory,
            score: props.scoredPoints
        }
        fetch(`${API}games`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(postObj)
        })
    }, [])

    return (

        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/border.png")}
                resizeMode="stretch"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <Text style={styles.gameSummary}>Game Summary</Text>
                <View style={styles.rect}>
                    <Text style={styles.score}>Score: {props.scoredPoints}</Text>
                    <Button title="New Game" onPress={props.goMenu}/>
                    <Button title="Quit" onPress={quitHandler}/>
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
    gameSummary: {
        fontSize: 30,
        marginTop: 49,
        marginLeft: 340
    },
    rect: {
        width: 513,
        height: 210,
        marginTop: 23,
        marginLeft: 179,
        alignItems: "center"
    },
    correct: {
        paddingTop: 5,
        fontSize: 25
    },
    score: {
        padding: 10,
        fontSize: 25,
        color: 'red'
    }
});

export default EndGameScreen;
