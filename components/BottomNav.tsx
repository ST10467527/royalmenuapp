// components/BottomNav.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNav() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.btn}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")} style={styles.btn}>
        <Text style={styles.text}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.btn}>
        <Text style={styles.text}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, borderTopWidth: 1, borderColor: "#eee", backgroundColor: "#fff" },
  btn: { alignItems: "center" },
  text: { color: "#1B5E20", fontWeight: "700" },
});
