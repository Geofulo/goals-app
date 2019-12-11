import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "@ui-kitten/components";

const GoalItem = props => {
	const addDeleteHandler = goalId => {
		props.onDelete(goalId);
	};

	return (
		<ListItem
			style={styles.listItem}
			title={props.goal.title}
			onLongPress={addDeleteHandler.bind(this, props.goal.id)}
		/>
	);
};

const styles = StyleSheet.create({
	listItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#d3d3d3"
	}
});

export default GoalItem;
