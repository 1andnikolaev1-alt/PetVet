import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPets, Pet } from '../utils/database';

const FEATURES = [
  { id: 'check', icon: '📸', title: 'AI-проверка\nздоровья', color: '#E8F5E9', route: 'SelectPetForCheck' },
  { id: 'symptoms', icon: '🔍', title: 'Симптомы\nи болезни', color: '#E3F2FD', route: 'SymptomChecker' },
  { id: 'firstaid', icon: '🩹', title: 'Первая\nпомощь', color: '#FFF3E0', route: 'FirstAid' },
  { id: 'food', icon: '🚫', title: 'Опасные\nпродукты', color: '#FFEBEE', route: 'DangerousFood' },
];

export default function HomeScreen({ navigation }: any) {
  const [pets, setPets] = useState<Pet[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPets().then(setPets);
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>🐾 ПитВет</Text>
          <Text style={styles.subtitle}>AI-ветеринар в кармане</Text>
        </View>

        <View style={styles.grid}>
          {FEATURES.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.card, { backgroundColor: f.color }]}
              onPress={() => navigation.navigate(f.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardIcon}>{f.icon}</Text>
              <Text style={styles.cardTitle}>{f.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Мои питомцы</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddPet')}>
              <Text style={styles.addBtn}>+ Добавить</Text>
            </TouchableOpacity>
          </View>

          {pets.length === 0 ? (
            <TouchableOpacity
              style={styles.emptyCard}
              onPress={() => navigation.navigate('AddPet')}
            >
              <Text style={styles.emptyIcon}>🐕</Text>
              <Text style={styles.emptyText}>Добавьте своего питомца</Text>
              <Text style={styles.emptyHint}>Для персонализированных рекомендаций</Text>
            </TouchableOpacity>
          ) : (
            pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petCard}
                onPress={() => navigation.navigate('PetProfile', { petId: pet.id })}
              >
                <Text style={styles.petIcon}>
                  {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐈' :
                   pet.type === 'rabbit' ? '🐇' : pet.type === 'hamster' ? '🐹' : '🦜'}
                </Text>
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petDetails}>
                    {pet.breed || ''}{pet.breed ? ' · ' : ''}
                    {pet.age_years > 0 ? `${pet.age_years} г.` : ''}
                    {pet.age_months > 0 ? ` ${pet.age_months} мес.` : ''}
                    {pet.weight ? ` · ${pet.weight} кг` : ''}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Совет дня</Text>
          <Text style={styles.tipText}>
            Регулярно проверяйте уши питомца — покраснение и запах могут говорить о начинающемся отите.
            Раннее обнаружение = быстрое лечение!
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
  header: { paddingTop: 16, paddingBottom: 8, alignItems: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 },
  card: {
    width: '48%', borderRadius: 16, padding: 16, marginBottom: 12,
    alignItems: 'center', minHeight: 120, justifyContent: 'center',
  },
  cardIcon: { fontSize: 36, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#333' },
  section: { marginTop: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addBtn: { fontSize: 14, color: '#2E7D32', fontWeight: '600' },
  emptyCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 24,
    alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0', borderStyle: 'dashed',
  },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#333' },
  emptyHint: { fontSize: 13, color: '#888', marginTop: 4 },
  petCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  petIcon: { fontSize: 40, marginRight: 12 },
  petInfo: { flex: 1 },
  petName: { fontSize: 17, fontWeight: '600', color: '#333' },
  petDetails: { fontSize: 13, color: '#888', marginTop: 2 },
  arrow: { fontSize: 24, color: '#CCC' },
  tipCard: {
    backgroundColor: '#FFF8E1', borderRadius: 16, padding: 16, marginTop: 12,
    borderLeftWidth: 4, borderLeftColor: '#FFC107',
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#F57F17', marginBottom: 6 },
  tipText: { fontSize: 13, color: '#555', lineHeight: 20 },
});
