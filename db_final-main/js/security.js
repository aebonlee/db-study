// 보안 관련 유틸리티 함수들

// 간단한 암호화 함수 (Base64 + 난독화)
function encryptData(data) {
    try {
        const jsonStr = JSON.stringify(data);
        // 문자열 반전 + Base64 인코딩
        const reversed = jsonStr.split('').reverse().join('');
        const encoded = btoa(reversed);
        // 추가 난독화
        return encoded.split('').map((char, i) => 
            String.fromCharCode(char.charCodeAt(0) + (i % 5))
        ).join('');
    } catch (e) {
        console.error('Encryption failed:', e);
        return null;
    }
}

// 복호화 함수
function decryptData(encryptedData) {
    try {
        if (!encryptedData) return null;
        // 난독화 해제
        const decoded = encryptedData.split('').map((char, i) => 
            String.fromCharCode(char.charCodeAt(0) - (i % 5))
        ).join('');
        // Base64 디코딩 + 문자열 복원
        const reversed = atob(decoded);
        const jsonStr = reversed.split('').reverse().join('');
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error('Decryption failed:', e);
        return null;
    }
}

// 타이머 무결성 검증
class SecureTimer {
    constructor() {
        this.startTime = Date.now();
        this.checkpoints = [];
        this.expectedDuration = 3600000; // 60분 in milliseconds
    }
    
    addCheckpoint() {
        this.checkpoints.push(Date.now());
    }
    
    validateTime(currentTime) {
        const elapsed = Date.now() - this.startTime;
        const reportedTime = (3600 - currentTime) * 1000;
        
        // 시간 차이가 5초 이상이면 조작 의심
        if (Math.abs(elapsed - reportedTime) > 5000) {
            console.warn('Timer manipulation detected');
            return false;
        }
        return true;
    }
    
    getElapsedTime() {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}

// localStorage 보호 래퍼
const SecureStorage = {
    setItem: function(key, value) {
        try {
            const encrypted = encryptData(value);
            localStorage.setItem(key, encrypted);
            // 체크섬 저장
            const checksum = this.generateChecksum(value);
            localStorage.setItem(key + '_cs', checksum);
        } catch (e) {
            console.error('Failed to save data:', e);
        }
    },
    
    getItem: function(key) {
        try {
            const encrypted = localStorage.getItem(key);
            const checksum = localStorage.getItem(key + '_cs');
            
            if (!encrypted) return null;
            
            const decrypted = decryptData(encrypted);
            
            // 체크섬 검증
            if (checksum && this.generateChecksum(decrypted) !== checksum) {
                console.warn('Data integrity check failed');
                return null;
            }
            
            return decrypted;
        } catch (e) {
            console.error('Failed to retrieve data:', e);
            return null;
        }
    },
    
    removeItem: function(key) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_cs');
    },
    
    generateChecksum: function(data) {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
};

// 개발자 도구 감지
const DevToolsDetector = {
    isOpen: false,
    orientation: undefined,
    
    init: function() {
        const threshold = 160;
        const emitEvent = (state, orientation) => {
            if (state) {
                console.warn('Developer tools detected');
                // 경고 표시 (선택적)
                // alert('개발자 도구 사용이 감지되었습니다. 시험 중에는 개발자 도구를 사용할 수 없습니다.');
            }
        };
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!this.isOpen) {
                    emitEvent(true, 'vertical');
                    this.isOpen = true;
                }
            } else {
                if (this.isOpen) {
                    emitEvent(false, undefined);
                    this.isOpen = false;
                }
            }
        }, 1000);
    }
};

// 우클릭 방지
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 텍스트 선택 방지 (시험 페이지에서만)
if (window.location.pathname.includes('exam.html')) {
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });
}

// F12 및 개발자 도구 단축키 방지
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (소스 보기)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        encryptData,
        decryptData,
        SecureTimer,
        SecureStorage,
        DevToolsDetector
    };
}