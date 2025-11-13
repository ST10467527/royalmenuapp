// screens/CustomizeScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { DISHES, Dish } from "../data/dishes";
import { useCart } from "../context/CartContext";

const CUISINE_TEMPLATES: Record<string, string[]> = {
  Italian: ["m2", "m5", "d4"],
  Mediterranean: ["s3", "m6", "d3"],
  "South African": ["s6", "m4", "d2"],
  Asian: ["m6", "m8", "dr2"],
  American: ["m7", "m1", "d5"],
};

export default function CustomizeScreen({ route }: { route?: any }) {
  const baseDishId = route?.params?.baseDishId as string | undefined;
  const [cuisine, setCuisine] = useState<string>("Italian");
  const [templates, setTemplates] = useState<Dish[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [customName, setCustomName] = useState("");
  const [notes, setNotes] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const ids = CUISINE_TEMPLATES[cuisine] || [];
    const t = ids.map((id) => DISHES.find((d) => d.id === id)).filter(Boolean) as Dish[];
    setTemplates(t);
    setSelectedIndex(t.length ? 0 : null);
  }, [cuisine]);

  useEffect(() => {
    if (baseDishId) {
      const base = DISHES.find((d) => d.id === baseDishId);
      if (base) {
        setCustomName(base.name + " (custom)");
        const t: Record<string, boolean> = {};
        base.ingredients.forEach((ing) => (t[ing] = true));
        setToggles(t);
      }
    }
  }, [baseDishId]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const chosen = templates[selectedIndex];
    if (!chosen) return;
    const t: Record<string, boolean> = {};
    chosen.ingredients.forEach((ing) => (t[ing] = true));
    setToggles(t);
    setCustomName(chosen.name + " (custom)");
  }, [selectedIndex, templates]);

  const toggleIng = (name: string) => setToggles((p) => ({ ...p, [name]: !p[name] }));

  const estimatedPrice = useMemo(() => {
    if (selectedIndex === null) return 0;
    const t = templates[selectedIndex];
    if (!t) return 0;
    let base = t.price;
    const extras = t.ingredients.reduce((sum, ing) => (toggles[ing] ? sum : sum - 5), 0);
    return Math.max(0, +(base + extras).toFixed(2));
  }, [selectedIndex, templates, toggles]);

  const handleSave = () => {
    if (selectedIndex === null) return;
    const chosen = templates[selectedIndex];
    if (!chosen) return;
    const customDish: Dish = {
      id: `${chosen.id}-custom-${Date.now()}`,
      name: customName || chosen.name,
      description: chosen.description + (notes ? ` • ${notes}` : ""),
      ingredients: chosen.ingredients.filter((ing) => toggles[ing]),
      price: estimatedPrice,
      course: chosen.course,
    };
    addToCart(customDish, { notes });
    alert(`Added to cart: ${customDish.name} • R ${customDish.price.toFixed(2)}`);
  };

  const avgCustomPrice = useMemo(() => {
    if (!templates.length) return 0;
    const sums = templates.map((t) => t.price);
    const avg = sums.reduce((s, v) => s + v, 0) / sums.length;
    return +avg.toFixed(2);
  }, [templates]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Customize Your Meal</Text>

        <Text style={styles.label}>Choose a cuisine</Text>
        <View style={styles.cuisineRow}>
          {Object.keys(CUISINE_TEMPLATES).map((c) => (
            <TouchableOpacity key={c} style={[styles.pill, cuisine === c && styles.pillActive]} onPress={() => setCuisine(c)}>
              <Text style={[styles.pillText, cuisine === c && styles.pillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Choose a template</Text>
        <View style={styles.templates}>
          {templates.map((t, idx) => (
            <TouchableOpacity key={t.id} style={[styles.templateCard, selectedIndex === idx && styles.templateActive]} onPress={() => setSelectedIndex(idx)}>
              <Text style={styles.templateTitle}>{t.name}</Text>
              <Text style={styles.templatePrice}>R {t.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedIndex !== null && templates[selectedIndex] && (
          <View style={styles.editor}>
            <Text style={styles.label}>Ingredients (toggle)</Text>
            {templates[selectedIndex].ingredients.map((ing) => (
              <View key={ing} style={styles.ingRow}>
                <Text style={styles.ingText}>{ing}</Text>
                <Switch value={!!toggles[ing]} onValueChange={() => toggleIng(ing)} />
              </View>
            ))}

            <Text style={[styles.label, { marginTop: 12 }]}>Custom name</Text>
            <TextInput style={styles.input} value={customName} onChangeText={setCustomName} placeholder="Optional name" />

            <Text style={[styles.label, { marginTop: 8 }]}>Notes / instructions</Text>
            <TextInput style={[styles.input, { minHeight: 80 }]} value={notes} onChangeText={setNotes} placeholder="e.g. no onions" multiline />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="cart" size={16} color="#fff" />
              <Text style={styles.saveText}> Add custom • Est: R {estimatedPrice.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.avgBox}>
          <Text style={styles.avgLabel}>Average template price: R {avgCustomPrice.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f5f6f8" },
  scroll: { padding: 16, paddingBottom: 120 },
  title: { fontSize: 20, fontWeight: "700", color: "#1B5E20" },
  label: { marginTop: 12, color: "#444", fontWeight: "600" },
  cuisineRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", marginRight: 8, marginBottom: 8 },
  pillActive: { backgroundColor: "#1B5E20", borderColor: "#1B5E20" },
  pillText: { color: "#444" },
  pillTextActive: { color: "#fff" },
  templates: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  templateCard: { flex: 1, backgroundColor: "#fff", padding: 12, marginRight: 8, borderRadius: 10, borderWidth: 1, borderColor: "#eee" },
  templateActive: { borderColor: "#cfe8ff", backgroundColor: "#f5fbff" },
  templateTitle: { fontWeight: "700" },
  templatePrice: { marginTop: 8, color: "#1B5E20" },
  editor: { marginTop: 12, backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#eee" },
  ingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  ingText: { color: "#333" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", padding: 10, borderRadius: 8, marginTop: 8 },
  saveBtn: { marginTop: 12, backgroundColor: "#1B5E20", padding: 12, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  saveText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  avgBox: { marginTop: 16, backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#eee", alignItems: "center" },
  avgLabel: { color: "#1B5E20", fontWeight: "700" },
});
