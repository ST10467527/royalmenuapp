
import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DISHES, Dish } from "../data/dishes";

export default function MenuScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedDishId = (route.params as any)?.selectedDishId as string | undefined;

  const ordered = useMemo(() => {
    if (!selectedDishId) return DISHES;
    const sel = DISHES.find((d) => d.id === selectedDishId);
    return sel ? [sel, ...DISHES.filter((d) => d.id !== selectedDishId)] : DISHES;
  }, [selectedDishId]);

  const avgPrice = useMemo(() => {
    const total = DISHES.reduce((s, d) => s + d.price, 0);
    return +(total / DISHES.length).toFixed(2);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>A list of options prepared for you by chef Christoffel</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {ordered.map((dish) => {
          const highlighted = selectedDishId === dish.id;
          return (
            <View key={dish.id} style={[styles.card, highlighted && styles.highlight]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{dish.name}</Text>
                <Text style={styles.price}>R {dish.price.toFixed(2)}</Text>
              </View>
              <Text style={styles.desc}>{dish.description}</Text>
              <View style={styles.ingWrap}>
                <Text style={styles.ingTitle}>Ingredients</Text>
                <Text style={styles.ingText}>{dish.ingredients.join(", ")}</Text>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.customBtn} onPress={() => navigation.navigate("Customize" as never, { baseDish: dish } as never)}>
                  <Ionicons name="add" size={16} color="#fff" />
                  <Text style={styles.customBtnText}>Customize</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.avgWrap}>
        <Text style={styles.avg}>Average meal price: <Text style={styles.avgVal}>R {avgPrice.toFixed(2)}</Text></Text>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="list" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Customize")}>
          <Ionicons name="add-circle" size={28} color="#D4AF37" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-out" size={22} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f5f6f8" },
  header: { padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#eee" },
  headerTitle: { fontSize: 15, fontWeight: "600", color: "#333" },

  scroll: { padding: 16, paddingBottom: 140 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#eee" },
  highlight: { borderColor: "#cfe8ff", backgroundColor: "#f5fbff" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  price: { color: "#1B5E20", fontWeight: "700" },
  desc: { color: "#4a4a4a", marginBottom: 8, lineHeight: 20 },

  ingWrap: { borderTopWidth: 1, borderTopColor: "#f0f0f0", paddingTop: 8 },
  ingTitle: { fontSize: 13, fontWeight: "700", marginBottom: 6 },
  ingText: { color: "#555" },

  cardFooter: { marginTop: 10, alignItems: "flex-end" },
  customBtn: { backgroundColor: "#1B5E20", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  customBtnText: { color: "#fff", marginLeft: 8, fontWeight: "700" },

  avgWrap: { padding: 12, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee", alignItems: "center" },
  avg: { color: "#666" },
  avgVal: { color: "#1B5E20", fontWeight: "700" },

  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, paddingVertical: 10, flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee" },
});
