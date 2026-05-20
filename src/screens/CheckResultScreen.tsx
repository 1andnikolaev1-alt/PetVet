import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image,
} from 'react-native';
import { getDb, HealthCheck } from '../utils/database';

export default function CheckResultScreen({ route, navigation }: any) {
  const { checkId, petName } = route.params;
  const [check, setCheck] = useState<HealthCheck | null>(null);

  useEffect(() => {
    (async () => {
      const db = await getDb();
      const result = await db.getFirstAsync<HealthCheck>('SELECT * FROM checks WHERE id = ?', checkId);
      setCheck(result);
    })();
  }, [checkId]);

  if (!check) return null;

  let parsed: any = {};
  try {
    parsed = JSON.parse(check.ai_result);
  } catch {
    parsed = { message: check.ai_result };
  }

  const conditions = parsed.conditions || [];
  const symptoms = parsed.symptoms || [];
  const message = parsed.message || '';

  const urgencyConfig = {
    emergency: { color: '#D32F2F', bg: '#FFEBEE', icon: '🚨', label: 'ЭКСТРЕННО', text: 'Немедленно к ветеринару!' },
    high: { color: '#F44336', bg: '#FFEBEE', icon: '🔴', label: 'Высокий', text: 'Обратитесь к ветеринару в ближайшее время' },
    medium: { color: '#FF9800', bg: '#FFF3E0', icon: '🟠', label: 'Средний', text: 'Наблюдайте за симптомами, при ухудшении — к ветеринару' },
    low: { color: '#4CAF50', bg: '#E8F5E9', icon: '🟢', label: 'Низкий', text: 'Вероятно, ничего серьёзного. Продолжайте наблюдение' },
  };

  const urg = urgencyConfig[check.urgency as keyof typeof urgencyConfig] || urgencyConfig.low;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.urgencyCard, { backgroundColor: urg.bg }]}>
          <Text style={styles.urgencyIcon}>{urg.icon}</Text>
          <Text style={[styles.urgencyLabel, { color: urg.color }]}>
            Уровень срочности: {urg.label}
          </Text>
          <Text style={styles.urgencyText}>{urg.text}</Text>
        </View>

        {check.photo_uri && (
          <Image source={{ uri: check.photo_uri }} style={styles.photo} />
        )}

        <Text style={styles.dateText}>
          {petName} · {new Date(check.created_at).toLocaleDateString('ru-RU', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })}
        </Text>

        {symptoms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Симптомы</Text>
            <View style={styles.chipRow}>
              {symptoms.map((s: string, i: number) => (
                <View key={i} style={styles.chip}>
                  <Text style={styles.chipText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {conditions.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Возможные причины</Text>
            {conditions.map((c: any, i: number) => (
              <View key={i} style={styles.conditionCard}>
                <View style={styles.conditionHeader}>
                  <Text style={styles.conditionName}>{c.name}</Text>
                  <View style={[styles.matchBadge,
                    { backgroundColor: c.match >= 60 ? '#FFECB3' : '#E0E0E0' }
                  ]}>
                    <Text style={styles.matchText}>Совпадение: {c.match}%</Text>
                  </View>
                </View>
                <Text style={styles.conditionDesc}>{c.description}</Text>

                <View style={styles.aidSection}>
                  <Text style={styles.aidTitle}>🩹 Первая помощь:</Text>
                  <Text style={styles.aidText}>{c.firstAid}</Text>
                </View>

                <View style={styles.aidSection}>
                  <Text style={styles.aidTitle}>🏥 Когда к ветеринару:</Text>
                  <Text style={styles.aidText}>{c.whenToVet}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : message ? (
          <View style={styles.section}>
            <View style={styles.messageCard}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>⚠️ Важно</Text>
          <Text style={styles.disclaimerText}>
            Этот анализ носит информационный характер и НЕ заменяет консультацию ветеринара.
            При серьёзных симптомах обязательно обратитесь к специалисту.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.homeBtnText}>На главную</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 16 },
  urgencyCard: {
    borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 16,
  },
  urgencyIcon: { fontSize: 48, marginBottom: 8 },
  urgencyLabel: { fontSize: 20, fontWeight: 'bold' },
  urgencyText: { fontSize: 14, color: '#555', marginTop: 6, textAlign: 'center' },
  photo: { width: '100%', height: 180, borderRadius: 14, marginTop: 16 },
  dateText: { fontSize: 13, color: '#888', marginTop: 12, textAlign: 'center' },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { backgroundColor: '#E3F2FD', borderRadius: 16, paddingVertical: 5, paddingHorizontal: 12 },
  chipText: { fontSize: 13, color: '#1565C0' },
  conditionCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 2,
  },
  conditionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  conditionName: { fontSize: 17, fontWeight: '700', color: '#333', flex: 1 },
  matchBadge: { borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  matchText: { fontSize: 11, fontWeight: '600', color: '#555' },
  conditionDesc: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  aidSection: { marginBottom: 10 },
  aidTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  aidText: { fontSize: 13, color: '#555', lineHeight: 19 },
  messageCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  messageText: { fontSize: 14, color: '#555', lineHeight: 20 },
  disclaimer: {
    backgroundColor: '#FFF3E0', borderRadius: 14, padding: 14, marginTop: 20,
    borderLeftWidth: 4, borderLeftColor: '#FF9800',
  },
  disclaimerTitle: { fontSize: 14, fontWeight: '700', color: '#E65100', marginBottom: 4 },
  disclaimerText: { fontSize: 12, color: '#555', lineHeight: 18 },
  homeBtn: {
    backgroundColor: '#2E7D32', borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 16,
  },
  homeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
