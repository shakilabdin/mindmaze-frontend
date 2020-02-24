import React from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback
} from "react-native";
import BlueButton from "../components/BlueButton";
import RedButton from "../components/RedButton";

const HomeScreen = props => {
    function doorPressHandler() {
        console.log("pressing door");
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={doorPressHandler}>
                <ImageBackground
                    source={require("../assets/mindmaze_2.jpg")}
                    resizeMode="stretch"
                    style={styles.image}
                >
                    <View style={styles.rect}></View>
                    <View style={styles.rect2}>
                        <View style={styles.materialButtonPrimaryStackRow}>
                            <View style={styles.materialButtonPrimaryStack}>
                                <BlueButton
                                    text={'Add Player'}
                                    style={styles.materialButtonPrimary}
                                ></BlueButton>
                                <View style={styles.rect3}></View>
                            </View>
                            <RedButton
                                text={'Delete'}
                                style={styles.materialButtonDanger}
                            ></RedButton>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 896,
        height: 414
    },
    rect: {
        width: 0,
        height: 0,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 23,
        marginLeft: 878
    },
    rect2: {
        width: 202,
        height: 145,
        backgroundColor: "rgba(230, 230, 230,1)",
        flexDirection: "row",
        marginTop: 211,
        marginLeft: 658
    },
    materialButtonPrimary: {
        top: 0,
        left: 0,
        width: 101,
        height: 28,
        position: "absolute"
    },
    rect3: {
        top: 14,
        left: 51,
        width: 3,
        height: -3,
        backgroundColor: "rgba(230, 230, 230,1)",
        position: "absolute"
    },
    materialButtonPrimaryStack: {
        width: 101,
        height: 28
    },
    materialButtonDanger: {
        width: 101,
        height: 29
    },
    materialButtonPrimaryStackRow: {
        height: 29,
        flexDirection: "row",
        flex: 1
    }
});

export default HomeScreen;
