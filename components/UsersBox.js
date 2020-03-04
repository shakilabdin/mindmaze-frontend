import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

const UsersBox = props => {
    const [checked, setChecked] = useState("first");

    function renderUsers() {
        let options;
        if (props.allUsers) {
            options = props.allUsers.map(user => {
                return (
                    <View style={styles.buttonContainer}>
                        <RadioButton value={user.name} />
                        <Text onPress={() => pressHandler(user)}>
                            {user.name}
                        </Text>
                    </View>
                );
            });
        }
        return options;
    }

    function pressHandler(user) {
        setChecked(user.name);
        props.setUser({user: user.id, name: user.name});
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <RadioButton.Group
                    onValueChange={value => setChecked(value)}
                    value={checked}
                >
                    {renderUsers()}
                </RadioButton.Group>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 30
    }
});

export default UsersBox;
