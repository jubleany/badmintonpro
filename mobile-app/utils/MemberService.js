/**
 * 멤버 관리 서비스
 */

const DEFAULT_MEMBERS = [
    { id: 1, name: '김철수', level: 'A', gender: '남' },
    { id: 2, name: '이영희', level: 'B', gender: '여' },
    { id: 3, name: '박민수', level: 'A', gender: '남' },
    { id: 4, name: '최지우', level: 'C', gender: '여' },
    { id: 5, name: '정우성', level: 'S', gender: '남' },
    { id: 6, name: '한지민', level: 'A', gender: '여' },
    { id: 7, name: '이정재', level: 'A', gender: '남' },
    { id: 8, name: '배수지', level: 'B', gender: '여' },
];

let members = [...DEFAULT_MEMBERS];

export const getMembers = () => {
    return [...members];
};

export const addMember = (member) => {
    const newMember = {
        ...member,
        id: Date.now(), // Simple ID generation
    };
    members.push(newMember);
    return newMember;
};

// Reset for testing
export const resetMembers = () => {
    members = [...DEFAULT_MEMBERS];
};
