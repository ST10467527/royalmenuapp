// components/BottomNav.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.tab}>
        <Ionicons name="home-outline" size={24} color="#1B5E20" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Menu")} style={styles.tab}>
        <Ionicons name="restaurant-outline" size={24} color="#1B5E20" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Customize")} style={styles.tab}>
        <Ionicons name="create-outline" size={24} color="#1B5E20" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.tab}>
        <Ionicons name="person-outline" size={24} color="#1B5E20" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
});
