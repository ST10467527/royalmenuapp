// screens/CartScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav";

export default function CartScreen() {
  const { items, subtotal, tax, total, removeFromCart, clearCart } = useCart();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
      </View>

      {items?.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 12, paddingBottom: 110 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                {item.customNotes ? <Text style={styles.note}>{item.customNotes}</Text> : null}
                <Text style={styles.qty}>R {item.price.toFixed(2)} x {item.quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.summary}>
        <Text style={styles.sumText}>Subtotal: R {subtotal.toFixed(2)}</Text>
        <Text style={styles.sumText}>Tax (15%): R {tax.toFixed(2)}</Text>
        <Text style={[styles.sumText, { fontWeight: "800", marginTop: 6 }]}>Total: R {total.toFixed(2)}</Text>

        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f7f7f7" },
  header: { padding: 16 },
  title: { fontSize: 20, fontWeight: "800", color: "#1B5E20" },

  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#777" },

  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
    alignItems: "center",
  },
  name: { fontWeight: "700" },
  note: { color: "#666", marginTop: 6 },
  qty: { marginTop: 6, color: "#333" },

  removeBtn: { backgroundColor: "#ff5252", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  removeText: { color: "#fff", fontWeight: "700" },

  summary: { padding: 16, borderTopWidth: StyleSheet.hairlineWidth, borderColor: "#eee", backgroundColor: "#fff" },
  sumText: { fontSize: 16, color: "#333" },

  clearBtn: { marginTop: 12, backgroundColor: "#1B5E20", padding: 12, borderRadius: 8 },
  clearText: { color: "#fff", textAlign: "center", fontWeight: "800" },
});
