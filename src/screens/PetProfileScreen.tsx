import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPetById, getHealthChecks, deletePet, Pet, HealthCheck } from '../utils/database';

export default function PetProfileScreen({ route, navigation }: any) {
  const { petId } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);
  const [checks, setChecks] = useState<HealthCheck[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPetById(petId).then(setPet);
      getHealthChecks(petId).then(setChecks);
    }, [petId])
  );

  const handleDelete = () => {
    Alert.alert(
      'Удалить питомца?',
      `Удалить ${pet?.name} и всю историю проверок?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить', style: 'destructive',
          onPress: async () => {
            await deletePet(petId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!pet) return null;

  const petIcon = pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐈' :
    pet.type === 'rabbit' ? '🐇' : pet.type === 'hamster' ? '🐹' : '🦜';

  const urgencyColor = (u: string) =>
    u === 'emergency' ? '#D32F2F' : u === 'high' ? '#F44336' :
    u === 'medium' ? '#FF9800' : '#4CAF50';

  const urgencyLabel = (u: string) =>
    u === 'emergency' ? '🚨 Экстренно' : u === 'high' ? '🔴 Высокий' :
    u === 'medium' ? '🟠 Средний' : '🟢 Низкий';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Text style={styles.petIcon}>{petIcon}</Text>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petBreed}>{pet.breed || 'Порода не указана'}</Text>
          <View style={styles.statsRow}>
            {(pet.age_years > 0 || pet.age_months > 0) && (
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {pet.age_years > 0 ? `${pet.age_years} г.` : ''}
                  {pet.age_months > 0 ? ` ${pet.age_months} мес.` : ''}
                </Text>
                <Text style={styles.statLabel}>Возраст</Text>
              </View>
            )}
            {pet.weight && (
              <View style={styles.stat}>
                <Text style={styles.statValue}>{pet.weight} кг</Text>
                <Text style={styles.statLabel}>Вес</Text>
              </View>
            )}
            <View style={styles.stat}>
              <Text style={styles.statValue}>{checks.length}</Text>
              <Text style={styles.statLabel}>Проверок</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkBtn}
          onPress={() => navigation.navigate('HealthCheck', { petId: pet.id, petName: pet.name, petType: pet.type })}
        >
          <Text style={styles.checkBtnIcon}>📸</Text>
          <Text style={styles.checkBtnText}>AI-проверка здоровья</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>История проверок</Text>
          {checks.length === 0 ? (
            <Text style={styles.emptyText}>Пока нет проверок</Text>
          ) : (
            checks.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.checkCard}
                onPress={() => navigation.navigate('CheckResult', { checkId: c.id, petName: pet.name })}
              >
                <View style={[styles.urgencyDot, { backgroundColor: urgencyColor(c.urgency) }]} />
                <View style={styles.checkInfo}>
                  <Text style={styles.checkDate}>
                    {new Date(c.created_at).toLocaleDateString('ru-RU', {
                      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </Text>
                  <Text style={styles.checkUrgency}>{urgencyLabel(c.urgency)}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Удалить питомца</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  profileCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    alignItems: 'center', marginTop: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  petIcon: { fontSize: 64, marginBottom: 8 },
  petName: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  petBreed: { fontSize: 15, color: '#888', marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 16, gap: 24 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#2E7D32' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  checkBtn: {
    backgroundColor: '#2E7D32', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 16,
  },
  checkBtnIcon: { fontSize: 24, marginRight: 10 },
  checkBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#999', textAlign: 'center', paddingVertical: 20 },
  checkCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
  },
  urgencyDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  checkInfo: { flex: 1 },
  checkDate: { fontSize: 14, color: '#333' },
  checkUrgency: { fontSize: 13, color: '#666', marginTop: 2 },
  arrow: { fontSize: 24, color: '#CCC' },
  deleteBtn: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    alignItems: 'center', marginTop: 24, borderWidth: 1, borderColor: '#FFCDD2',
  },
  deleteBtnText: { color: '#D32F2F', fontSize: 15, fontWeight: '600' },
});
