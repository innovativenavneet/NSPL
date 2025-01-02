import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width; // Get the screen width

const UpdateMatchInformation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Match Information</Text>
      <View style={styles.matchInfo}>
        <Text style={styles.matchTitle}>ICC Test Match/Australia</Text>
      </View>
      <ScrollView>
        <ScrollView horizontal>
          <View style={[styles.table, { width: screenWidth }]}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell]}>Player Name</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Run Scored</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Ball Faced</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Strike Rate</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Status</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Action</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Player 1</Text>
              <Text style={styles.tableCell}>15</Text>
              <Text style={styles.tableCell}>10</Text>
              <Text style={styles.tableCell}>15.0</Text>
              <Text style={styles.tableCell}>Batting</Text>
              <TouchableOpacity>
                <Text style={[styles.tableCell, styles.actionText]}>[Update]</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Player 2</Text>
              <Text style={styles.tableCell}>0</Text>
              <Text style={styles.tableCell}>5</Text>
              <Text style={styles.tableCell}>0.0</Text>
              <Text style={styles.tableCell}>Out</Text>
              <TouchableOpacity>
                <Text style={[styles.tableCell, styles.actionText]}>[Update]</Text>
              </TouchableOpacity>
            </View>
            {Array.from({ length: 9 }).map((_, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>Player {index + 3}</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>Yet To Bat</Text>
                <Text style={[styles.tableCell, styles.disabledText]}>[DNB]</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>[Substitute] - Substitute Player</Text>
        <Text style={styles.footerText}>[DNB] - Did Not Bat</Text>
        <Text style={styles.footerText}>[Out] - Player Out</Text>
        <Text style={styles.footerText}>[Extra Run] - Runs from extras</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  matchInfo: {
    backgroundColor: "#008080",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  matchTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  table: {
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    fontSize: 14,
    minWidth: screenWidth / 6, // Adjust cell width to fit screen
  },
  headerCell: {
    fontWeight: "bold",
  },
  actionText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  disabledText: {
    color: "#888888",
  },
  footer: {
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#555555",
    marginBottom: 4,
  },
});

export default UpdateMatchInformation;
