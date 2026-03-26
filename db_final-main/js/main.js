// 메인 페이지 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    
    // 이전 사용자 정보 로드
    loadUserInfo();
    
    // 폼 제출 이벤트
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const userStudentId = document.getElementById('userStudentId').value.trim();
        
        if (!userName || !userStudentId) {
            alert('이름과 학번을 모두 입력해주세요.');
            return;
        }
        
        // 사용자 정보 저장
        const userInfo = {
            name: userName,
            studentId: userStudentId,
            startTime: new Date().toISOString()
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // 기존 답안 초기화 확인
        if (localStorage.getItem('examAnswers')) {
            const confirmReset = confirm('이전 시험 기록이 있습니다. 새로 시작하시겠습니까?');
            if (confirmReset) {
                localStorage.removeItem('examAnswers');
                localStorage.removeItem('examSubmitted');
            }
        }
        
        // 시험 페이지로 이동
        window.location.href = 'exam.html';
    });
    
    // 이전 사용자 정보 로드
    function loadUserInfo() {
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            const userInfo = JSON.parse(savedUserInfo);
            document.getElementById('userName').value = userInfo.name || '';
            // 이전 버전 호환성을 위해 email 필드도 체크
            if (userInfo.studentId) {
                document.getElementById('userStudentId').value = userInfo.studentId;
            } else if (userInfo.email) {
                // 이전 데이터가 있으면 학번 필드는 비워둠
                document.getElementById('userStudentId').value = '';
            }
        }
    }
    
    // 엔터키로 다음 필드로 이동
    document.getElementById('userName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('userStudentId').focus();
        }
    });
});