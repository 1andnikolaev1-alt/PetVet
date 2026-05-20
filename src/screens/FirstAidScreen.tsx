import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { FIRST_AID_TIPS } from '../data/pets';

export default function FirstAidScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Первая помощь</Text>
        <Text style={styles.subtitle}>Экстренные ситуации — что делать до ветеринара</Text>

        {FIRST_AID_TIPS.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={styles.card}
            onPress={() => setExpanded(expanded === tip.id ? null : tip.id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{tip.title}</Text>
              <Text style={styles.chevron}>{expanded === tip.id ? '▼' : '▶'}</Text>
            </View>

            {expanded === tip.id && (
              <View style={styles.cardBody}>
                {tip.steps.map((step, i) => (
                  <View key={i} style={styles.step}>
                    <View style={styles.stepNum}>
                      <Text style={styles.stepNumText}>{i + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
                <View style={styles.warning}>
                  <Text style={styles.warningTitle}>⚠️ Внимание:</Text>
                  <Text style={styles.warningText}>{tip.warning}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyIcon}>🆘</Text>
          <Text style={styles.emergencyTitle}>Экстренная ситуация?</Text>
          <Text style={styles.emergencyText}>
            Если жизни питомца угрожает опасность — не теряйте время, сразу везите к ветеринару!
            По дороге можно позвонить в ветклинику для инструкций.
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
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#333' },
  chevron: { fontSize: 14, color: '#999' },
  cardBody: { marginTop: 14 },
  step: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  stepNum: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#E8F5E9',
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1,
  },
  stepNumText: { fontSize: 12, fontWeight: '700', color: '#2E7D32' },
  stepText: { fontSize: 14, color: '#444', lineHeight: 20, flex: 1 },
  warning: {
    backgroundColor: '#FFF3E0', borderRadius: 10, padding: 12, marginTop: 8,
    borderLeftWidth: 3, borderLeftColor: '#FF9800',
  },
  warningTitle: { fontSize: 13, fontWeight: '700', color: '#E65100', marginBottom: 4 },
  warningText: { fontSize: 12, color: '#555', lineHeight: 18 },
  emergencyCard: {
    backgroundColor: '#FFEBEE', borderRadius: 16, padding: 20,
    alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#FFCDD2',
  },
  emergencyIcon: { fontSize: 40, marginBottom: 8 },
  emergencyTitle: { fontSize: 18, fontWeight: 'bold', color: '#D32F2F', marginBottom: 8 },
  emergencyText: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
});
