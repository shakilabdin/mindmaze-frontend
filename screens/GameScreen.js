import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button } from "react-native";

const GameScreen = props => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [timer, setTimer] = useState(0);
    const [askedQuestions, setAskedQuestions] = useState([]);

    const API = `http://localhost:3000/categories/3`;

    // fetch all questions in chosen category
    const fetchQuestions = async () => {
        const apiCall = await fetch(API);
        const questions = await apiCall.json();
        setAllQuestions(questions.questions);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        chooseQuestion();
    }, [allQuestions])
    

    function chooseQuestion() {
        let question =
            allQuestions[Math.floor(Math.random() * allQuestions.length)];
        setCurrentQuestion(question);
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.answerContainers}>
                <Text>
                    {currentQuestion && currentQuestion.question}
                </Text>
                {currentQuestion ? <Button title={currentQuestion.correct_choice}/> : null}
                {currentQuestion ? <Button title={currentQuestion.first_incorrect}/> : null}
                {currentQuestion ? <Button title={currentQuestion.second_incorrect}/> : null}
                {currentQuestion ? <Button title={currentQuestion.third_incorrect}/> : null}
            </View>
            <View>
                <Text>{timer}</Text>
            </View>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerContainers: {
        justifyContent: 'center',
        width: '40%'
    }
});

export default GameScreen;
