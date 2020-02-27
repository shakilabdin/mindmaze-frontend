import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from "react-native";

const SplashScreen = props => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={props.goHome}>
                <Image
                    source={require("../assets/mindmaze_1.jpg")}
                    resizeMode="stretch"
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 896,
        height: 414
    }
});

export default SplashScreen;
