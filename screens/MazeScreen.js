import React, { useEffect } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Canvas from "react-native-canvas";

const API = "http://localhost:3000/";

class MazeScreen extends React.Component {
    handleCanvas = canvas => {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 0, 200, 200);
    };

    render() {
        return (
            <View style={styles.container}>
                <Canvas ref={this.handleCanvas} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 270
    }
});

export default MazeScreen;
