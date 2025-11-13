import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Please enter your name");
      return;
    }
    // Navigate to HomeScreen and pass username
    navigation.navigate("Home", { user: username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Royal Menu App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 },
  button: { backgroundColor: "#d4af37", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
