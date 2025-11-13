// screens/HomeScreen.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { DISHES, Dish, Course } from "../data/dishes";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useCart } from "../context/CartContext";

const FILTERS: (Course | "All")[] = ["All", "Starter", "Main", "Dessert", "Drink", "Special"];

export default function HomeScreen({ route }: { route?: any }) {
  const passedUser = route?.params?.user ?? "Guest";
  const { addToCart, subtotal } = useCart();

  const [filter, setFilter] = useState<Course | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return DISHES;
    return DISHES.filter((d) => d.course === filter);
  }, [filter]);

  const averagePrice = useMemo(() => {
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((s, d) => s + d.price, 0);
    return +(sum / filtered.length).toFixed(2);
  }, [filtered]);

  const grouped = useMemo(() => {
    const groups: Record<string, Dish[]> = {};
    for (const d of DISHES) {
      if (!groups[d.course]) groups[d.course] = [];
      groups[d.course].push(d);
    }
    return groups;
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome, {passedUser}!</Text>
          <Text style={styles.subtitle}>This is the Home Screen of your Royal Menu App.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Dishes</Text>
          <View style={styles.filterRow}>
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <TouchableOpacity
                  key={String(f)}
                  style={[styles.filterBtn, active && styles.filterActive]}
                  onPress={() => setFilter(f)}
                >
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>{f}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.avgRow}>
            <Text style={styles.avgLabel}>Average price: </Text>
            <Text style={styles.avgValue}>R {averagePrice.toFixed(2)}</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="cart" size={18} color="#1B5E20" />
            <Text style={{ marginLeft: 6, color: "#1B5E20", fontWeight: "700" }}>R {subtotal.toFixed(2)}</Text>
          </View>

          <FlatList
            data={filtered}
            horizontal
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardCourse}>{item.course}</Text>
                <Text numberOfLines={2} style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                  <Ionicons name="cart" size={16} color="#fff" />
                  <Text style={styles.addText}> Add</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          {Object.keys(grouped).map((course) => (
            <View key={course} style={{ marginTop: 12 }}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{course}</Text>
                <Text style={styles.groupCount}>{grouped[course].length} items</Text>
              </View>
              <View>
                {grouped[course].slice(0, 3).map((d) => (
                  <View key={d.id} style={styles.listRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listName}>{d.name}</Text>
                      <Text style={styles.listPrice}>R {d.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.smallAdd} onPress={() => addToCart(d)}>
                      <Ionicons name="add" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f7f7f7" },
  header: { padding: 16 },
  welcome: { fontSize: 22, fontWeight: "800", color: "#1B5E20" },
  subtitle: { fontSize: 14, color: "#333", marginTop: 6 },
  section: { paddingHorizontal: 12, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  filterRow: { flexDirection: "row", marginTop: 10, gap: 8 },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#fff", borderRadius: 20, borderWidth: 1, borderColor: "#ececec", marginRight: 8 },
  filterActive: { backgroundColor: "#1B5E20", borderColor: "#1B5E20" },
  filterText: { color: "#333", fontWeight: "600" },
  filterTextActive: { color: "#fff" },
  avgRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  avgLabel: { color: "#666" },
  avgValue: { fontWeight: "700", marginLeft: 6, color: "#1B5E20" },

  card: { width: 220, backgroundColor: "#fff", borderRadius: 12, padding: 12, marginRight: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: "#eaeaea" },
  cardTitle: { fontWeight: "700", fontSize: 16 },
  cardCourse: { fontSize: 12, color: "#1B5E20", marginTop: 6 },
  cardDesc: { fontSize: 13, color: "#666", marginTop: 8 },
  price: { marginTop: 10, fontWeight: "700", color: "#333" },
  addBtn: { marginTop: 10, backgroundColor: "#1B5E20", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
  addText: { color: "#fff", fontWeight: "700" },

  groupHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  groupTitle: { fontSize: 16, fontWeight: "700", color: "#333" },
  groupCount: { color: "#777" },

  listRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 8, marginTop: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: "#eee" },
  listName: { fontWeight: "600" },
  listPrice: { color: "#666" },
  smallAdd: { backgroundColor: "#1B5E20", padding: 8, borderRadius: 8 },
});
