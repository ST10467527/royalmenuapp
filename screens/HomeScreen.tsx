import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DISHES, Dish } from "../data/dishes";

const COURSES = ["All", "Starter", "Main", "Dessert", "Drink", "Special"] as const;

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = (route.params as any)?.user ?? "Guest";

  const [filter, setFilter] = useState<typeof COURSES[number]>("All");
  const [searchText, setSearchText] = useState("");

  // Filtered dishes based on search text and course filter
  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      if (filter !== "All" && d.course !== filter) return false;
      if (searchText.trim() !== "" && !d.name.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    });
  }, [filter, searchText]);

  // Average price per course
  const avgPricePerCourse = useMemo(() => {
    const courses = COURSES.filter(c => c !== "All");
    const result: { [key: string]: number } = {};

    courses.forEach(course => {
      const courseDishes = DISHES.filter(d => d.course === course);
      if (courseDishes.length > 0) {
        const total = courseDishes.reduce((sum, d) => sum + d.price, 0);
        result[course] = +(total / courseDishes.length).toFixed(2);
      } else {
        result[course] = 0;
      }
    });

    return result;
  }, []);

  const renderItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Menu", { selectedDishId: item.id })}
    >
      <View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCourse}>{item.course}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={18} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {user}!</Text>
        <Text style={styles.sub}>This is the Home Screen of your Royal Menu App</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.pills}>
          {COURSES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.pill, filter === c && styles.pillActive]}
              onPress={() => setFilter(c)}
            >
              <Text style={[styles.pillText, filter === c && styles.pillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color="#666" />
          <TextInput
            placeholder="Search dishes..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.listWrap}>
        <FlatList
          data={filtered || []} // fallback to empty array
          keyExtractor={(i) => i.id.toString()} // convert number id to string
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.avg}>Average prices per course:</Text>
        {Object.entries(avgPricePerCourse).map(([course, price]) => (
          <Text key={course} style={styles.avgVal}>
            {course}: R {price.toFixed(2)}
          </Text>
        ))}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#1B5E20" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="list" size={24} color="#666" />
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
  welcome: { fontSize: 20, fontWeight: "700", color: "#1B5E20" },
  sub: { marginTop: 6, color: "#666" },

  controls: { padding: 12 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  pill: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", marginRight: 8, marginBottom: 8 },
  pillActive: { backgroundColor: "#1B5E20", borderColor: "#1B5E20" },
  pillText: { color: "#444", fontWeight: "600" },
  pillTextActive: { color: "#fff" },

  searchRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 8, borderRadius: 8, borderWidth: 1, borderColor: "#eee" },
  searchInput: { marginLeft: 8, flex: 1 },

  listWrap: { flex: 1, padding: 16 },
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#eee" },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardCourse: { color: "#2e7d32", marginTop: 4, fontSize: 12 },
  price: { color: "#1B5E20", fontWeight: "700" },

  footer: { padding: 12, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee", alignItems: "center" },
  avg: { color: "#666", fontWeight: "600" },
  avgVal: { color: "#1B5E20", fontWeight: "700" },

  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, paddingVertical: 10, flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee" },
});
