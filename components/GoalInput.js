import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Input, Button } from "@ui-kitten/components";

const GoalInput = props => {
	const [enteredGoal, setEnteredGoal] = useState("");

	const goalInputHandler = text => {
		setEnteredGoal(text);
	};

	const addButtonHandler = () => {
		if (enteredGoal.length == 0) return;
		props.onAdd(enteredGoal);
		setEnteredGoal("");
	};

	return (
		<Modal style={styles.modal} visible={props.isModalVisible} animationType="slide">
			<View style={styles.inputContainer}>
				<Input placeholder="My Goal..." style={styles.input} onChangeText={goalInputHandler} value={enteredGoal} />
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonView}>
						<Button status="danger" onPress={props.onCancel}>
							Cancel
						</Button>
					</View>
					<View style={styles.buttonView}>
						<Button status="success" onPress={addButtonHandler}>
							Add
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {},
	inputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	input: {
		width: "80%",
		marginVertical: 20
	},
	buttonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%"
	},
	buttonView: {
		width: "30%"
	}
});

export default GoalInput;
