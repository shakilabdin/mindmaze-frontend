import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import BlueButton from "../components/BlueButton";
import RedButton from "../components/RedButton";
import UserModal from "../components/UserModal";
import UsersBox from "../components/UsersBox";

API = "http://localhost:3000/";

const HomeScreen = props => {
    const [modalState, setModalState] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    // on mount fetch all users and set user hook
    useEffect(() => {
        fetch(`${API}/users`)
            .then(resp => resp.json())
            .then(result => setAllUsers(result));
    }, []);

    // after selecting player and then pressing door game start
    function doorPressHandler() {
        if (props.user !== 0) {
            console.log("pressing door after choosing");
            props.goMenu()
        } else {
            Alert.alert(
                "Please Choose a Player",
                null,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }

    // function renders add user modal as button is pressed
    function showModal() {
        if (modalState) {
            return (
                <UserModal
                    style={styles.modal}
                    addPlayerHandler={addPlayerHandler}
                    cancelHandler={cancelHandler}
                />
            );
        }
    }

    // on add player button press change modal state to true and render modal
    function addPlayerButton() {
        setModalState(true);
    }

    // start post fetch and then add it on the user list
    function addPlayerHandler(player) {
        console.log("player handler", player);
        postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({ name: player })
        };
        fetch(`${API}/users`, postObj)
            .then(resp => resp.json())
            .then(result => setUsers([...users, result]));
        setModalState(false);
    }

    // close modal / cancel add player
    function cancelHandler() {
        setModalState(false);
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={doorPressHandler}>
                <ImageBackground
                    source={require("../assets/mindmaze_2.jpg")}
                    resizeMode="stretch"
                    style={styles.image}
                >
                    <View style={styles.menuContainer}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.materialButtonPrimaryStack}>
                                <BlueButton
                                    text={"Add Player"}
                                    style={styles.materialButtonPrimary}
                                    onPress={() => addPlayerButton()}
                                ></BlueButton>
                            </View>
                            <RedButton
                                text={"Delete"}
                                style={styles.materialButtonDanger}
                            ></RedButton>
                        </View>
                        <View style={styles.playerContainer}>
                            <UsersBox
                                allUsers={allUsers}
                                setUser={props.setUser}
                            />
                        </View>
                    </View>
                    {showModal()}
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
    menuContainer: {
        width: 202,
        height: 145,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 230,
        marginLeft: 658,
        overflow: "hidden"
    },
    buttonContainer: {
        height: 29,
        flexDirection: "row"
    },
    materialButtonPrimary: {
        top: 0,
        left: 0,
        width: 101,
        height: 28,
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
    playerContainer: {},
    modal: {
        width: 258,
        height: 134,
        marginTop: -279,
        alignSelf: "center"
    }
});

export default HomeScreen;
