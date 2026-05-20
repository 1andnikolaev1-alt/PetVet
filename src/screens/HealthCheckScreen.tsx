import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Image, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SYMPTOMS, SYMPTOM_CATEGORIES, CONDITIONS } from '../data/pets';
import { addHealthCheck } from '../utils/database';

const API_URL = 'http://5.129.233.22:8002';

export default function HealthCheckScreen({ route, navigation }: any) {
  const { petId, petName, petType } = route.params;
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('skin');

  const pickImage = async (useCamera: boolean) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
    };
    const result = useCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const categorySymptoms = SYMPTOMS.filter((s) => s.category === activeCategory);

  const analyzeHealth = async () => {
    if (selectedSymptoms.length === 0 && !photo) {
      Alert.alert('Ошибка', 'Выберите симптомы или сделайте фото');
      return;
    }

    setLoading(true);

    try {
      const symptomNames = selectedSymptoms.map(
        (id) => SYMPTOMS.find((s) => s.id === id)?.name || id
      );

      const matchedConditions = CONDITIONS.filter((c) =>
        c.symptoms.some((s) => selectedSymptoms.includes(s))
      ).map((c) => {
        const matchCount = c.symptoms.filter((s) => selectedSymptoms.includes(s)).length;
        const matchPercent = Math.round((matchCount / c.symptoms.length) * 100);
        return { ...c, matchCount, matchPercent };
      }).sort((a, b) => b.matchPercent - a.matchPercent);

      let aiResult = '';
      let urgency = 'low';

      if (photo) {
        try {
          const formData = new FormData();
          formData.append('photo', {
            uri: photo,
            type: 'image/jpeg',
            name: 'pet_photo.jpg',
          } as any);
          formData.append('symptoms', JSON.stringify(symptomNames));
          formData.append('pet_type', petType);
          formData.append('notes', notes);

          const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            aiResult = data.analysis || '';
            urgency = data.urgency || 'low';
          }
        } catch {
          // API unavailable, use local analysis
        }
      }

      if (!aiResult) {
        if (matchedConditions.length > 0) {
          const top = matchedConditions[0];
          urgency = top.urgency;
          aiResult = JSON.stringify({
            conditions: matchedConditions.slice(0, 3).map((c) => ({
              name: c.name,
              description: c.description,
              match: c.matchPercent,
              urgency: c.urgency,
              firstAid: c.firstAid,
              whenToVet: c.whenToVet,
            })),
            symptoms: symptomNames,
            notes: notes,
          });
        } else {
          aiResult = JSON.stringify({
            conditions: [],
            symptoms: symptomNames,
            notes: notes,
            message: 'По выбранным симптомам не удалось определить конкретное заболевание. Рекомендуем обратиться к ветеринару для осмотра.',
          });
        }
      }

      const checkId = await addHealthCheck(petId, photo, JSON.stringify(symptomNames), aiResult, urgency);
      navigation.replace('CheckResult', { checkId, petName });
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось провести анализ. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Проверка здоровья</Text>
        <Text style={styles.subtitle}>Пациент: {petName}</Text>

        <Text style={styles.label}>📸 Фото (необязательно)</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={styles.photoBtn} onPress={() => pickImage(true)}>
            <Text style={styles.photoBtnIcon}>📷</Text>
            <Text style={styles.photoBtnText}>Камера</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoBtn} onPress={() => pickImage(false)}>
            <Text style={styles.photoBtnIcon}>🖼️</Text>
            <Text style={styles.photoBtnText}>Галерея</Text>
          </TouchableOpacity>
        </View>
        {photo && (
          <View style={styles.previewBox}>
            <Image source={{ uri: photo }} style={styles.preview} />
            <TouchableOpacity style={styles.removePhoto} onPress={() => setPhoto(null)}>
              <Text style={styles.removePhotoText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>🔍 Симптомы</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {SYMPTOM_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catBtn, activeCategory === cat.id && styles.catBtnActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={[styles.catText, activeCategory === cat.id && styles.catTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.symptomGrid}>
          {categorySymptoms.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.symptomBtn, selectedSymptoms.includes(s.id) && styles.symptomBtnActive]}
              onPress={() => toggleSymptom(s.id)}
            >
              <Text style={styles.symptomIcon}>{s.icon}</Text>
              <Text style={[styles.symptomText, selectedSymptoms.includes(s.id) && styles.symptomTextActive]}>
                {s.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSymptoms.length > 0 && (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedTitle}>
              Выбрано: {selectedSymptoms.length}
            </Text>
            <View style={styles.selectedList}>
              {selectedSymptoms.map((id) => {
                const s = SYMPTOMS.find((sym) => sym.id === id);
                return s ? (
                  <TouchableOpacity
                    key={id}
                    style={styles.selectedChip}
                    onPress={() => toggleSymptom(id)}
                  >
                    <Text style={styles.selectedChipText}>{s.name} ✕</Text>
                  </TouchableOpacity>
                ) : null;
              })}
            </View>
          </View>
        )}

        <Text style={styles.label}>📝 Дополнительные заметки</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Опишите подробнее что заметили..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[styles.analyzeBtn, loading && styles.analyzeBtnDisabled]}
          onPress={analyzeHealth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.analyzeBtnIcon}>🔬</Text>
              <Text style={styles.analyzeBtnText}>Анализировать</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#2E7D32', marginTop: 4, marginBottom: 16 },
  label: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 8, marginTop: 16 },
  photoRow: { flexDirection: 'row', gap: 12 },
  photoBtn: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
  },
  photoBtnIcon: { fontSize: 28, marginBottom: 4 },
  photoBtnText: { fontSize: 13, color: '#555' },
  previewBox: { marginTop: 10, borderRadius: 14, overflow: 'hidden', position: 'relative' },
  preview: { width: '100%', height: 200, borderRadius: 14 },
  removePhoto: {
    position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
  },
  removePhotoText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  catScroll: { marginBottom: 12 },
  catBtn: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
    backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: '#E0E0E0',
    flexDirection: 'row', alignItems: 'center',
  },
  catBtnActive: { backgroundColor: '#E8F5E9', borderColor: '#2E7D32' },
  catIcon: { fontSize: 16, marginRight: 4 },
  catText: { fontSize: 13, color: '#666' },
  catTextActive: { color: '#2E7D32', fontWeight: '600' },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBtn: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0',
  },
  symptomBtnActive: { backgroundColor: '#FFECB3', borderColor: '#FFA000' },
  symptomIcon: { fontSize: 10 },
  symptomText: { fontSize: 13, color: '#555' },
  symptomTextActive: { color: '#E65100', fontWeight: '600' },
  selectedBox: {
    backgroundColor: '#FFF8E1', borderRadius: 12, padding: 12, marginTop: 12,
  },
  selectedTitle: { fontSize: 13, fontWeight: '600', color: '#F57F17', marginBottom: 8 },
  selectedList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  selectedChip: {
    backgroundColor: '#FFE082', borderRadius: 16, paddingVertical: 4, paddingHorizontal: 10,
  },
  selectedChipText: { fontSize: 12, color: '#E65100' },
  notesInput: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    fontSize: 15, borderWidth: 1, borderColor: '#E0E0E0',
    minHeight: 80, textAlignVertical: 'top',
  },
  analyzeBtn: {
    backgroundColor: '#2E7D32', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20,
  },
  analyzeBtnDisabled: { opacity: 0.6 },
  analyzeBtnIcon: { fontSize: 22, marginRight: 8 },
  analyzeBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
