import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

const UsersBox = props => {
    const [checked, setChecked] = useState("first");
    console.log(props.users);

    function renderUsers() {
        let options;
        if (props.users) {
            options = props.users.map(user => {
                return (
                    <View style={styles.buttonContainer}>
                        <RadioButton value={user.name} />
                        <Text onPress={() => setChecked(user.name)}>
                            {user.name}
                        </Text>
                    </View>
                );
            });
        }
        return options;
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
