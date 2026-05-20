import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { SYMPTOMS, SYMPTOM_CATEGORIES, CONDITIONS } from '../data/pets';

export default function SymptomCheckerScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowResults(false);
  };

  const matchedConditions = CONDITIONS.filter((c) =>
    c.symptoms.some((s) => selected.includes(s))
  ).map((c) => {
    const matchCount = c.symptoms.filter((s) => selected.includes(s)).length;
    const matchPercent = Math.round((matchCount / c.symptoms.length) * 100);
    return { ...c, matchCount, matchPercent };
  }).sort((a, b) => b.matchPercent - a.matchPercent);

  const urgencyColor = (u: string) =>
    u === 'emergency' ? '#D32F2F' : u === 'high' ? '#F44336' :
    u === 'medium' ? '#FF9800' : '#4CAF50';

  const urgencyLabel = (u: string) =>
    u === 'emergency' ? '🚨 Экстренно' : u === 'high' ? '🔴 Высокий' :
    u === 'medium' ? '🟠 Средний' : '🟢 Низкий';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Проверка симптомов</Text>
        <Text style={styles.subtitle}>Выберите все симптомы, которые наблюдаете</Text>

        {SYMPTOM_CATEGORIES.map((cat) => {
          const catSymptoms = SYMPTOMS.filter((s) => s.category === cat.id);
          return (
            <View key={cat.id} style={styles.catSection}>
              <Text style={styles.catTitle}>{cat.icon} {cat.name}</Text>
              <View style={styles.symptomRow}>
                {catSymptoms.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.symptomBtn, selected.includes(s.id) && styles.symptomBtnActive]}
                    onPress={() => toggle(s.id)}
                  >
                    <Text style={[styles.symptomText, selected.includes(s.id) && styles.symptomTextActive]}>
                      {s.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {selected.length > 0 && (
          <TouchableOpacity
            style={styles.analyzeBtn}
            onPress={() => setShowResults(true)}
          >
            <Text style={styles.analyzeBtnText}>
              Анализировать ({selected.length} симптомов)
            </Text>
          </TouchableOpacity>
        )}

        {showResults && matchedConditions.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Возможные причины:</Text>
            {matchedConditions.map((c) => (
              <View key={c.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultName}>{c.name}</Text>
                  <Text style={[styles.urgencyBadge, { color: urgencyColor(c.urgency) }]}>
                    {urgencyLabel(c.urgency)}
                  </Text>
                </View>
                <Text style={styles.resultDesc}>{c.description}</Text>
                <View style={styles.matchBar}>
                  <View style={[styles.matchFill, { width: `${c.matchPercent}%`, backgroundColor: urgencyColor(c.urgency) }]} />
                </View>
                <Text style={styles.matchLabel}>Совпадение: {c.matchPercent}%</Text>

                <View style={styles.aidBox}>
                  <Text style={styles.aidTitle}>🩹 Первая помощь:</Text>
                  <Text style={styles.aidText}>{c.firstAid}</Text>
                </View>
                <View style={styles.aidBox}>
                  <Text style={styles.aidTitle}>🏥 Когда к ветеринару:</Text>
                  <Text style={styles.aidText}>{c.whenToVet}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {showResults && matchedConditions.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              По выбранным симптомам не найдено совпадений. Рекомендуем обратиться к ветеринару.
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 16 },
  catSection: { marginBottom: 16 },
  catTitle: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 8 },
  symptomRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomBtn: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0',
  },
  symptomBtnActive: { backgroundColor: '#FFECB3', borderColor: '#FFA000' },
  symptomText: { fontSize: 13, color: '#555' },
  symptomTextActive: { color: '#E65100', fontWeight: '600' },
  analyzeBtn: {
    backgroundColor: '#2E7D32', borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 8,
  },
  analyzeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  results: { marginTop: 20 },
  resultsTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  resultCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    elevation: 1,
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  resultName: { fontSize: 17, fontWeight: '700', color: '#333', flex: 1 },
  urgencyBadge: { fontSize: 13, fontWeight: '600' },
  resultDesc: { fontSize: 13, color: '#666', lineHeight: 19, marginBottom: 10 },
  matchBar: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginBottom: 4 },
  matchFill: { height: 6, borderRadius: 3 },
  matchLabel: { fontSize: 12, color: '#888', marginBottom: 10 },
  aidBox: { marginBottom: 8 },
  aidTitle: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 3 },
  aidText: { fontSize: 12, color: '#555', lineHeight: 18 },
  noResults: { backgroundColor: '#fff', borderRadius: 14, padding: 20, marginTop: 20, alignItems: 'center' },
  noResultsText: { fontSize: 14, color: '#888', textAlign: 'center' },
});
