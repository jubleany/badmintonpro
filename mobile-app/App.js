import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, TextInput, Alert, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateMatches } from './utils/MatchService';

// --- Theme Colors ---
const COLORS = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#CCFF00', // Neon Green
  text: '#FFFFFF',
  textDim: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(255, 255, 255, 0.1)',
};

function MemberCheckInScreen() {
  const navigation = useNavigation();
  // 더미 데이터: 실제로는 API나 스토어에서 가져옴
  const [members, setMembers] = useState([
    { id: 1, name: '김철수', level: '자강', gender: '남', checked: false },
    { id: 2, name: '이영희', level: 'A', gender: '여', checked: true },
    { id: 3, name: '박민수', level: 'A', gender: '남', checked: false },
    { id: 4, name: '최지우', level: 'B', gender: '여', checked: false },
    { id: 5, name: '정우성', level: 'A', gender: '남', checked: true },
    { id: 6, name: '한지민', level: 'C', gender: '여', checked: false },
  ]);

  const toggleCheck = (id) => {
    setMembers(prev => prev.map(m =>
      m.id === id ? { ...m, checked: !m.checked } : m
    ));
  };

  const checkedCount = members.filter(m => m.checked).length;

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>멤버 체크인</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>참석 인원: <Text style={styles.statusHighlight}>{checkedCount}</Text>명</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {members.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={[styles.checkInCard, member.checked && styles.checkedCard]}
            onPress={() => toggleCheck(member.id)}
          >
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.levelBadgeText}>{member.level}</Text>
                <Text style={styles.genderBadgeText}>{member.gender}</Text>
              </View>
            </View>
            <View style={[styles.checkBox, member.checked && styles.checkedBox]}>
              {member.checked && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.actionButtonText}>체크인 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Ranking Screen ---
function RankingScreen() {
  const navigation = useNavigation();
  const rankers = [
    { id: 1, name: '김철수', points: 1250, winRate: '82%', tier: 'Gold' },
    { id: 2, name: '이영희', points: 1180, winRate: '75%', tier: 'Silver' },
    { id: 3, name: '박민수', points: 1050, winRate: '68%', tier: 'Silver' },
    { id: 4, name: '정우성', points: 980, winRate: '60%', tier: 'Bronze' },
    { id: 5, name: '최지우', points: 920, winRate: '55%', tier: 'Bronze' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>랭킹</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top 3 Podium (Simplified) */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 30, gap: 10 }}>
          {/* 2nd Place */}
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 24 }}>🥈</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>이영희</Text>
            <View style={{ width: 60, height: 80, backgroundColor: '#C0C0C0', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
          </View>

          {/* 1st Place */}
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, backgroundColor: '#FFD700', borderRadius: 4, marginBottom: 4 }} />
            <Text style={{ color: '#FFD700', fontSize: 10, fontWeight: 'bold' }}>WINNER</Text>
            <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFD700', alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 2, borderColor: '#FFF' }}>
              <Text style={{ fontSize: 32 }}>🥇</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>김철수</Text>
            <View style={{ width: 70, height: 110, backgroundColor: '#FFD700', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
          </View>

          {/* 3rd Place */}
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#CD7F32', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 24 }}>🥉</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>박민수</Text>
            <View style={{ width: 60, height: 60, backgroundColor: '#CD7F32', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
          </View>
        </View>

        {/* List */}
        {rankers.map((r, i) => (
          <View key={r.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.surface,
            padding: 16,
            borderRadius: 12,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: i < 3 ? 'rgba(255, 215, 0, 0.3)' : COLORS.border
          }}>
            <Text style={{ color: COLORS.textDim, fontWeight: 'bold', width: 30, fontSize: 16 }}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{r.name}</Text>
              <Text style={{ color: COLORS.textDim, fontSize: 12 }}>승률 {r.winRate}</Text>
            </View>
            <Text style={{ color: COLORS.primary, fontWeight: '900', fontSize: 18 }}>{r.points}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// --- Screens ---

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BADMINTON PRO</Text>
        <Text style={styles.headerSubtitle}>MANAGER</Text>
      </View>

      <View style={styles.menuContainer}>
        {/* Row 1: 등록 & 체크인 */}
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={[styles.menuCard, { flex: 1 }]}
            onPress={() => navigation.navigate('RegisterMember')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FFD700', width: 50, height: 50 }]}>
              <Text style={[styles.iconText, { fontSize: 20 }]}>+</Text>
            </View>
            <Text style={[styles.menuTitle, { fontSize: 16 }]}>등록</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuCard, { flex: 1 }]}
            onPress={() => navigation.navigate('MemberCheckIn')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#00D2FF', width: 50, height: 50 }]}>
              <Text style={[styles.iconText, { fontSize: 20 }]}>✓</Text>
            </View>
            <Text style={[styles.menuTitle, { fontSize: 16 }]}>체크인</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2: 랭킹 & 대진 생성 */}
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={[styles.menuCard, { flex: 1 }]}
            onPress={() => navigation.navigate('Ranking')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#9B59B6', width: 50, height: 50 }]}>
              <Text style={[styles.iconText, { fontSize: 20 }]}>🏆</Text>
            </View>
            <Text style={[styles.menuTitle, { fontSize: 16 }]}>랭킹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuCard, { flex: 1 }]}
            onPress={() => navigation.navigate('GenerateMatch')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#CCFF00', width: 50, height: 50 }]}>
              <Text style={[styles.iconText, { fontSize: 20 }]}>⚡</Text>
            </View>
            <Text style={[styles.menuTitle, { fontSize: 16 }]}>대진 생성</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3: Live 경기 현황 */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('LiveMatches')}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FF4757' }]}>
            <Text style={styles.iconText}>LIVE</Text>
          </View>
          <Text style={styles.menuTitle}>경기 현황</Text>
          <Text style={styles.menuDesc}>진행 중인 경기 스코어보드</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function RegisterMemberScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('자강'); // Default changed to '자강'
  const [gender, setGender] = useState('남');

  const levels = ['자강', 'A', 'B', 'C', 'D', 'E', '초심'];

  const handleRegister = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    // In a real app, you would dispatch an action or call a service to save the member
    // For now, we'll just log it and go back
    console.log('Registering member:', { name, level, gender });

    // TODO: Add member to global state/store

    alert(`${name} (${level}/${gender}) 등록이 완료되었습니다.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>멤버 등록</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Name Input */}
        <View style={styles.formSection}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor={COLORS.textDim}
          />
        </View>

        {/* Level Selection */}
        <View style={styles.formSection}>
          <Text style={styles.label}>급수</Text>
          <View style={styles.chipContainer}>
            {levels.map((l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.chip,
                  level === l && styles.activeChip
                ]}
                onPress={() => setLevel(l)}
              >
                <Text style={[
                  styles.chipText,
                  level === l && styles.activeChipText
                ]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.formSection}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.genderCard, gender === '남' && styles.activeGenderCard]}
              onPress={() => setGender('남')}
            >
              <Text style={[styles.genderIcon, gender === '남' && styles.activeGenderText]}>♂</Text>
              <Text style={[styles.genderText, gender === '남' && styles.activeGenderText]}>남성</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderCard, gender === '여' && styles.activeGenderCard]}
              onPress={() => setGender('여')}
            >
              <Text style={[styles.genderIcon, gender === '여' && styles.activeGenderText]}>♀</Text>
              <Text style={[styles.genderText, gender === '여' && styles.activeGenderText]}>여성</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleRegister}>
          <Text style={styles.actionButtonText}>등록 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function GenerateMatchScreen() {
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();

  const handleGenerate = () => {
    const newMatches = generateMatches();
    setMatches(newMatches);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>대진 생성</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {matches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>생성된 대진표가 없습니다.</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleGenerate}>
              <Text style={styles.actionButtonText}>랜덤 매칭 시작</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>1라운드 매치업</Text>
              <TouchableOpacity onPress={handleGenerate}>
                <Text style={styles.linkText}>다시 섞기</Text>
              </TouchableOpacity>
            </View>

            {matches.map((match) => (
              <View key={match.id} style={styles.matchCard}>
                <View style={styles.matchHeader}>
                  <Text style={styles.courtName}>{match.name}</Text>
                  <Text style={styles.timeText}>{match.time}</Text>
                </View>

                <View style={styles.matchBody}>
                  {/* Team A */}
                  <View style={styles.teamContainer}>
                    {match.teamA.map((p, i) => (
                      <Text key={i} style={styles.playerName}>{p.name} <Text style={styles.levelBadge}>{p.level}</Text></Text>
                    ))}
                  </View>

                  <View style={styles.vsContainer}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>

                  {/* Team B */}
                  <View style={[styles.teamContainer, { alignItems: 'flex-end' }]}>
                    {match.teamB.map((p, i) => (
                      <Text key={i} style={styles.playerName}>{p.name} <Text style={styles.levelBadge}>{p.level}</Text></Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.actionButton, { marginTop: 20 }]}
              onPress={() => navigation.navigate('LiveMatches')}
            >
              <Text style={styles.actionButtonText}>경기 시작</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function LiveMatchesScreen() {
  const navigation = useNavigation();
  // 더미 데이터
  const liveMatches = [
    { id: 1, court: '1번 코트', scoreA: 21, scoreB: 19, teamA: '김철수/이영희', teamB: '박민수/최지우', set: 1 },
    { id: 2, court: '2번 코트', scoreA: 15, scoreB: 11, teamA: '정우성/한지민', teamB: '이정재/배수지', set: 2 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>진행 중인 경기</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {liveMatches.map((match) => (
          <View key={match.id} style={styles.liveCard}>
            <View style={styles.liveHeader}>
              <Text style={styles.liveBadge}>LIVE</Text>
              <Text style={styles.courtName}>{match.court}</Text>
            </View>

            <View style={styles.scoreBoard}>
              <View style={styles.teamScore}>
                <Text style={styles.scoreText}>{match.scoreA}</Text>
                <Text style={styles.teamName}>{match.teamA}</Text>
              </View>
              <Text style={styles.scoreVs}>:</Text>
              <View style={styles.teamScore}>
                <Text style={styles.scoreText}>{match.scoreB}</Text>
                <Text style={styles.teamName}>{match.teamB}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// --- Navigation ---

const Stack = createNativeStackNavigator();

export default function App() {
  // 웹 브라우저에서 실행 시 전체 화면 설정
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = COLORS.background;
      document.body.style.margin = '0';
      document.body.style.height = '100vh';

      const root = document.getElementById('root');
      if (root) {
        root.style.height = '100%';
        root.style.width = '100%';
      }
    }
  }, []);

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaProvider>
      <View style={isWeb ? styles.webContainer : styles.nativeContainer}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MemberCheckIn" component={MemberCheckInScreen} />
            <Stack.Screen name="RegisterMember" component={RegisterMemberScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
            <Stack.Screen name="GenerateMatch" component={GenerateMatchScreen} />
            <Stack.Screen name="LiveMatches" component={LiveMatchesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // 웹/네이티브 컨테이너 스타일 (통일)
  nativeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  webContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 6,
  },
  menuContainer: {
    padding: 20,
    gap: 20,
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  menuTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuDesc: {
    color: COLORS.textDim,
    fontSize: 14,
  },
  // Nav Header
  navHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop: 40, // Simple status bar spacing
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: COLORS.text,
    fontSize: 24,
  },
  navTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // Generate Match
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: 20,
  },
  emptyText: {
    color: COLORS.textDim,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchCard: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  courtName: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeText: {
    color: COLORS.textDim,
    fontSize: 12,
  },
  matchBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamContainer: {
    flex: 1,
    gap: 8,
  },
  playerName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelBadge: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: 'normal',
  },
  vsContainer: {
    paddingHorizontal: 20,
  },
  vsText: {
    color: 'rgba(255,255,255,0.1)',
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  // Live Matches
  liveCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  liveBadge: {
    color: '#FF4757',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  teamScore: {
    alignItems: 'center',
    flex: 1,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.text,
  },
  teamName: {
    color: COLORS.textDim,
    fontSize: 12,
    marginTop: 4,
  },
  scoreVs: {
    color: COLORS.textDim,
    fontSize: 24,
    fontWeight: '100',
  },
  // Form Styles
  formSection: {
    marginBottom: 24,
  },
  label: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    color: COLORS.text,
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textDim,
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeChipText: {
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  genderCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  activeGenderCard: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
  },
  genderIcon: {
    fontSize: 32,
    color: COLORS.textDim,
  },
  genderText: {
    color: COLORS.textDim,
    fontWeight: 'bold',
  },
  activeGenderText: {
    color: COLORS.text,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  // CheckIn Styles
  menuRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statusBar: {
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.textDim,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusHighlight: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'black',
  },
  checkInCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkedCard: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
  },
  memberInfo: {
    gap: 4,
  },
  memberName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  levelBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  genderBadgeText: {
    color: COLORS.textDim,
    fontSize: 12,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkMark: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
