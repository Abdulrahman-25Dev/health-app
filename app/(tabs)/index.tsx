import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Clock, Flame, MapPin, Play, Pause } from 'lucide-react-native';

export default function Index() {
  const [steps, setSteps] = useState(4805);
  const goal = 6000;
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(4440); // 1h 14m مؤقتاً

  // مؤقت حساب المدة النشطة
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setSteps((prev) => prev + 2); // محاكاة زيادة الخطوات مع الوقت
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // تحويل الثواني إلى صيغة 1h 14m
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  // الحسابات المباشرة
  const calories = Math.round(steps * 0.04);
  const distance = ((steps * 0.78) / 1000).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* بطاقة عداد الخطوات الرئيسي */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Steps</Text>
          <Text style={styles.stepsText}>{steps.toLocaleString()}</Text>
          <Text style={styles.goalText}>/{goal}</Text>

          <TouchableOpacity 
            style={styles.playButton} 
            onPress={() => setIsActive(!isActive)}
          >
            {isActive ? <Pause size={24} color="#FFF" /> : <Play size={24} color="#FFF" style={{ marginLeft: 3 }} />}
          </TouchableOpacity>
        </View>

        {/* المؤشرات الثلاثة: المدة، السعرات، المسافة */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Clock size={20} color="#F97316" />
            <Text style={styles.statValue}>{formatTime(seconds)}</Text>
            <Text style={styles.statLabel}>time</Text>
          </View>

          <View style={styles.statBox}>
            <Flame size={20} color="#EF4444" />
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>kcal</Text>
          </View>

          <View style={styles.statBox}>
            <MapPin size={20} color="#22C55E" />
            <Text style={styles.statValue}>{distance}</Text>
            <Text style={styles.statLabel}>km</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardLabel: {
    color: '#94A3B8',
    fontSize: 16,
  },
  stepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  goalText: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#22C55E',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
});