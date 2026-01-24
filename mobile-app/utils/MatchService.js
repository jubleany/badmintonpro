/**
 * 배드민턴 대진 생성 서비스
 */

// 더미 참가자 데이터 (실제 앱에서는 사용자 입력이나 DB에서 가져옴)
export const MOCK_PARTICIPANTS = [
    { id: 1, name: '김철수', level: 'A', gender: '남' },
    { id: 2, name: '이영희', level: 'B', gender: '여' },
    { id: 3, name: '박민수', level: 'A', gender: '남' },
    { id: 4, name: '최지우', level: 'C', gender: '여' },
    { id: 5, name: '정우성', level: 'S', gender: '남' },
    { id: 6, name: '한지민', level: 'A', gender: '여' },
    { id: 7, name: '이정재', level: 'A', gender: '남' },
    { id: 8, name: '배수지', level: 'B', gender: '여' },
];

/**
 * 대진표 생성 함수
 * @param {Array} participants 참가자 목록
 * @param {string} method 매칭 방식 ('random' | 'balance' | 'winners')
 * @returns {Array} 생성된 매치 목록
 */
export const generateMatches = (participants = MOCK_PARTICIPANTS, method = 'random') => {
    // 참가자 복사 및 셔플
    let pool = [...participants];

    if (method === 'random') {
        pool.sort(() => 0.5 - Math.random());
    } else if (method === 'balance') {
        // 밸런스 매칭: 레벨순 정렬 후 스네이크 방식 등으로 섞어야 하지만, 여기선 단순 셔플
        // 실제 로직 구현 필요 시 여기에 작성
        pool.sort(() => 0.5 - Math.random());
    }

    const matches = [];
    const courtCount = Math.floor(pool.length / 4);

    for (let i = 0; i < courtCount; i++) {
        const idx = i * 4;
        matches.push({
            id: i + 1,
            name: `${i + 1}번 코트`,
            teamA: [pool[idx], pool[idx + 1]],
            teamB: [pool[idx + 2], pool[idx + 3]],
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            status: 'waiting', // waiting, playing, finished
        });
    }

    return matches;
};
