import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
    return (
        <View>
            <TouchableWithoutFeedback onPress={props.goMenu}>
                <Image
                    source={require("../assets/mindmaze_2.jpg")}
                    resizeMode={"contain"}
                    style={styles.splash}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

styles = StyleSheet.create({
    splash: {
        width: width,
        height: height
    }
});

export default HomeScreen;
