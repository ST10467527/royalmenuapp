// screens/MenuScreen.tsx
import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { DISHES, Dish } from "../data/dishes";
import BottomNav from "../components/BottomNav";
import { useCart } from "../context/CartContext";

export default function MenuScreen() {
  const { addToCart, subtotal } = useCart();

  const grouped = useMemo(() => {
    const out: Record<string, Dish[]> = {};
    for (const d of DISHES) {
      if (!out[d.course]) out[d.course] = [];
      out[d.course].push(d);
    }
    return out;
  }, []);

  const avgPerCourse = useMemo(() => {
    const map: Record<string, number> = {};
    Object.keys(grouped).forEach((k) => {
      const list = grouped[k];
      const avg = list.reduce((s, d) => s + d.price, 0) / list.length;
      map[k] = +avg.toFixed(2);
    });
    return map;
  }, [grouped]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>A list of options prepared for you by Chef Christoffel</Text>
        <Text style={styles.sub}>Subtotal in cart: R {subtotal.toFixed(2)}</Text>
      </View>

      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(k) => k}
        contentContainerStyle={{ padding: 12, paddingBottom: 90 }}
        renderItem={({ item: course }) => (
          <View style={{ marginBottom: 18 }}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course}</Text>
              <Text style={styles.courseAvg}>Avg R {avgPerCourse[course]?.toFixed(2)}</Text>
            </View>

            {grouped[course].map((d) => (
              <View key={d.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{d.name}</Text>
                  <Text style={styles.cardDesc}>{d.description}</Text>
                  <Text style={styles.cardPrice}>R {d.price.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(d)}>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f7f7f7" },
  header: { padding: 12 },
  title: { fontSize: 16, fontWeight: "700", color: "#1B5E20" },
  sub: { color: "#666", marginTop: 4 },

  courseHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  courseTitle: { fontSize: 16, fontWeight: "700" },
  courseAvg: { color: "#1B5E20", fontWeight: "700" },

  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 12, marginTop: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "#eee" },
  cardTitle: { fontWeight: "700" },
  cardDesc: { color: "#666", marginTop: 6 },
  cardPrice: { marginTop: 8, fontWeight: "700", color: "#333" },

  addBtn: { backgroundColor: "#1B5E20", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  addText: { color: "#fff", fontWeight: "700" },
});
