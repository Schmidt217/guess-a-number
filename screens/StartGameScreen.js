import { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	KeyboardAvoidingView,
} from "react-native";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [selectedNumber, setSelectedNumber] = useState();
	const [confirmed, setConfirmed] = useState(false);
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get("window").width / 4);
		};
		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be a number between 1 and 99.",
				[{ text: "OK", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}
		setConfirmed(true);
		setEnteredValue("");
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.output}>
				<BodyText>You Selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.screen}>
						<TitleText>Start a New Game!</TitleText>
						<Card style={styles.inputContainer}>
							<BodyText>Select a Number!</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Reset"
										onPress={resetInputHandler}
										color={Colors.secondary}
									/>
								</View>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Confirm"
										onPress={confirmInputHandler}
										color={Colors.primary}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	inputContainer: {
		width: "80%",
		minWidth: 300,
		maxWidth: "95%",
		alignItems: "center",
		marginTop: 30,
	},
	input: {
		width: 50,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	output: {
		marginTop: 20,
		alignItems: "center",
	},
});

export default StartGameScreen;
