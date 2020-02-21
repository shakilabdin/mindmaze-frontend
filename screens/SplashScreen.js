import React from "react";
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = (props) => {
    return (
        <View>
            <TouchableWithoutFeedback onPress={props.goHome}>
                <Image
                    source={require("../assets/mindmaze_1.jpg")}
                    resizeMode={"contain"}
                    style={styles.splash}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

styles = StyleSheet.create({
    splash: {
        width: 800,
        height: height
    }
});

export default SplashScreen;
