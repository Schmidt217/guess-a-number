import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Image,
	View,
	Text,
	Dimensions,
	ScrollView,
} from "react-native";
import colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import { useOrientation } from "../components/useOrientation";

const GameOver = (props) => {
	const orientation = useOrientation();
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View
					style={{
						...styles.imageContainer,
						width: Dimensions.get("window").width * 0.5,
						height: Dimensions.get("window").width * 0.5,
						borderRadius: (Dimensions.get("window").width * 0.5) / 2,
					}}
				>
					<Image
						source={require("../assets/success.png")}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultsContainer}>
					<BodyText style={styles.resultText}>
						Your phone needed{" "}
						<Text style={styles.highlight}>{props.rounds}</Text> rounds to guess
						the number <Text style={styles.highlight}>{props.userNumber}</Text>
					</BodyText>
				</View>
				<MainButton onPress={props.newGame}>NEW GAME</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
	},
	imageContainer: {
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	imageContainerLandscape: {
		borderRadius: (Dimensions.get("window").width * 0.5) / 2,
		width: Dimensions.get("window").width * 0.5,
		height: Dimensions.get("window").width * 0.5,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultsContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get("window").height / 60,
	},
	resultText: {
		textAlign: "center",
		fontSize: Dimensions.get("window").width > 400 ? 20 : 16,
	},
	highlight: {
		color: colors.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOver;
