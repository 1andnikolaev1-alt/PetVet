import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { DANGEROUS_FOODS } from '../data/pets';

export default function DangerousFoodScreen() {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');

  const foods = DANGEROUS_FOODS[petType];

  const dangerColor = (d: string) =>
    d === 'high' ? '#D32F2F' : d === 'medium' ? '#FF9800' : '#FFC107';
  const dangerBg = (d: string) =>
    d === 'high' ? '#FFEBEE' : d === 'medium' ? '#FFF3E0' : '#FFFDE7';
  const dangerLabel = (d: string) =>
    d === 'high' ? '☠️ Опасно' : d === 'medium' ? '⚠️ Нежелательно' : '⚡ Осторожно';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Опасные продукты</Text>
        <Text style={styles.subtitle}>Что нельзя давать питомцу</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, petType === 'dog' && styles.tabActive]}
            onPress={() => setPetType('dog')}
          >
            <Text style={styles.tabIcon}>🐕</Text>
            <Text style={[styles.tabText, petType === 'dog' && styles.tabTextActive]}>Собаки</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, petType === 'cat' && styles.tabActive]}
            onPress={() => setPetType('cat')}
          >
            <Text style={styles.tabIcon}>🐈</Text>
            <Text style={[styles.tabText, petType === 'cat' && styles.tabTextActive]}>Кошки</Text>
          </TouchableOpacity>
        </View>

        {foods.map((food, i) => (
          <View key={i} style={[styles.foodCard, { borderLeftColor: dangerColor(food.danger) }]}>
            <View style={styles.foodHeader}>
              <Text style={styles.foodName}>{food.name}</Text>
              <View style={[styles.dangerBadge, { backgroundColor: dangerBg(food.danger) }]}>
                <Text style={[styles.dangerText, { color: dangerColor(food.danger) }]}>
                  {dangerLabel(food.danger)}
                </Text>
              </View>
            </View>
            <Text style={styles.foodDesc}>{food.description}</Text>
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Что делать при отравлении?</Text>
          <Text style={styles.tipText}>
            1. НЕ вызывайте рвоту без указания ветеринара{'\n'}
            2. Запомните что и сколько съел питомец{'\n'}
            3. Позвоните в ветклинику немедленно{'\n'}
            4. Возьмите упаковку продукта с собой к ветеринару
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 16 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 12, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  tabActive: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  tabIcon: { fontSize: 20, marginRight: 6 },
  tabText: { fontSize: 15, color: '#666' },
  tabTextActive: { color: '#2E7D32', fontWeight: '600' },
  foodCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10,
    borderLeftWidth: 4,
  },
  foodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  foodName: { fontSize: 16, fontWeight: '600', color: '#333' },
  dangerBadge: { borderRadius: 8, paddingVertical: 3, paddingHorizontal: 8 },
  dangerText: { fontSize: 11, fontWeight: '600' },
  foodDesc: { fontSize: 13, color: '#666', lineHeight: 19 },
  tipCard: {
    backgroundColor: '#E3F2FD', borderRadius: 14, padding: 16, marginTop: 12,
    borderLeftWidth: 4, borderLeftColor: '#1976D2',
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#1565C0', marginBottom: 8 },
  tipText: { fontSize: 13, color: '#444', lineHeight: 22 },
});
