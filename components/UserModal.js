import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const UserModal = props => {
    const [input, setInput] = useState("");

    function changeHandler(e) {
        console.log(e);
        setInput(e);
    }

    function submitHandler() {
        props.addPlayerHandler(input)
    }

    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.addNewUser}>Add New User</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={changeHandler}
                value={input}
            />
            <View style={styles.buttonContainer}>
                <Button title="Add" onPress={submitHandler}/>
                <Button title="Cancel" color="red" onPress={props.cancelHandler}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(230, 230, 230,1)"
    },
    addNewUser: {
        fontSize: 16,
        marginTop: 14,
        alignSelf: "center"
    },
    input: {
        alignSelf: "center",
        marginTop: 25,
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 12
    }
});

export default UserModal;
