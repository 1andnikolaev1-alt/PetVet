import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPets, Pet } from '../utils/database';

export default function SelectPetScreen({ navigation }: any) {
  const [pets, setPets] = useState<Pet[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPets().then(setPets);
    }, [])
  );

  const petIcon = (type: string) =>
    type === 'dog' ? '🐕' : type === 'cat' ? '🐈' :
    type === 'rabbit' ? '🐇' : type === 'hamster' ? '🐹' : '🦜';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Выберите питомца</Text>
        <Text style={styles.subtitle}>Для кого проводим AI-проверку?</Text>

        {pets.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🐾</Text>
            <Text style={styles.emptyText}>Сначала добавьте питомца</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('AddPet')}
            >
              <Text style={styles.addBtnText}>+ Добавить питомца</Text>
            </TouchableOpacity>
          </View>
        ) : (
          pets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={styles.petCard}
              onPress={() => navigation.navigate('HealthCheck', {
                petId: pet.id, petName: pet.name, petType: pet.type,
              })}
            >
              <Text style={styles.petIcon}>{petIcon(pet.type)}</Text>
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed || ''}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 20 },
  petCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2,
  },
  petIcon: { fontSize: 44, marginRight: 14 },
  petInfo: { flex: 1 },
  petName: { fontSize: 18, fontWeight: '600', color: '#333' },
  petBreed: { fontSize: 13, color: '#888', marginTop: 2 },
  arrow: { fontSize: 26, color: '#CCC' },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 64, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#888', marginBottom: 16 },
  addBtn: { backgroundColor: '#2E7D32', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
