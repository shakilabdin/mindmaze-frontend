import React from "react";
import { StyleSheet, Image } from "react-native";


const Border = () => {
  return (
      <Image
        style={styles.canvas}
        source={require("../assets/border.png")}
      />
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    resizeMode: "stretch"
  }
});

