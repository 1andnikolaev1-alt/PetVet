import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { addPet } from '../utils/database';
import { PET_TYPES, DOG_BREEDS, CAT_BREEDS } from '../data/pets';

export default function AddPetScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [weight, setWeight] = useState('');
  const [showBreeds, setShowBreeds] = useState(false);

  const breeds = type === 'dog' ? DOG_BREEDS : type === 'cat' ? CAT_BREEDS : [];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите имя питомца');
      return;
    }
    if (!type) {
      Alert.alert('Ошибка', 'Выберите тип питомца');
      return;
    }
    await addPet(
      name.trim(), type, breed,
      parseInt(ageYears) || 0,
      parseInt(ageMonths) || 0,
      weight ? parseFloat(weight) : null
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Новый питомец</Text>

          <Text style={styles.label}>Тип животного *</Text>
          <View style={styles.typeRow}>
            {PET_TYPES.map((pt) => (
              <TouchableOpacity
                key={pt.id}
                style={[styles.typeBtn, type === pt.id && styles.typeBtnActive]}
                onPress={() => { setType(pt.id); setBreed(''); setShowBreeds(false); }}
              >
                <Text style={styles.typeIcon}>{pt.icon}</Text>
                <Text style={[styles.typeText, type === pt.id && styles.typeTextActive]}>
                  {pt.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Имя *</Text>
          <TextInput
            style={styles.input}
            placeholder="Как зовут питомца?"
            value={name}
            onChangeText={setName}
          />

          {breeds.length > 0 && (
            <>
              <Text style={styles.label}>Порода</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowBreeds(!showBreeds)}
              >
                <Text style={breed ? styles.inputText : styles.placeholder}>
                  {breed || 'Выберите породу'}
                </Text>
              </TouchableOpacity>
              {showBreeds && (
                <View style={styles.breedList}>
                  {breeds.map((b) => (
                    <TouchableOpacity
                      key={b}
                      style={[styles.breedItem, breed === b && styles.breedItemActive]}
                      onPress={() => { setBreed(b); setShowBreeds(false); }}
                    >
                      <Text style={breed === b ? styles.breedTextActive : styles.breedText}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          <Text style={styles.label}>Возраст</Text>
          <View style={styles.ageRow}>
            <View style={styles.ageField}>
              <TextInput
                style={styles.input}
                placeholder="Лет"
                keyboardType="numeric"
                value={ageYears}
                onChangeText={setAgeYears}
              />
            </View>
            <View style={styles.ageField}>
              <TextInput
                style={styles.input}
                placeholder="Месяцев"
                keyboardType="numeric"
                value={ageMonths}
                onChangeText={setAgeMonths}
              />
            </View>
          </View>

          <Text style={styles.label}>Вес (кг)</Text>
          <TextInput
            style={styles.input}
            placeholder="Например: 5.5"
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Сохранить</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0',
  },
  inputText: { fontSize: 16, color: '#333' },
  placeholder: { fontSize: 16, color: '#999' },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeBtn: {
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0',
    alignItems: 'center', minWidth: 70,
  },
  typeBtnActive: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  typeIcon: { fontSize: 24, marginBottom: 2 },
  typeText: { fontSize: 12, color: '#666' },
  typeTextActive: { color: '#2E7D32', fontWeight: '600' },
  breedList: {
    backgroundColor: '#fff', borderRadius: 12, marginTop: 4,
    borderWidth: 1, borderColor: '#E0E0E0', maxHeight: 200,
  },
  breedItem: { paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  breedItemActive: { backgroundColor: '#E8F5E9' },
  breedText: { fontSize: 15, color: '#333' },
  breedTextActive: { fontSize: 15, color: '#2E7D32', fontWeight: '600' },
  ageRow: { flexDirection: 'row', gap: 12 },
  ageField: { flex: 1 },
  saveBtn: {
    backgroundColor: '#2E7D32', borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
