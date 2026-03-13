import { Link } from 'react-router-dom';

const DeployOps = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>배포와 운영</h1>
        <p>환경변수, 마이그레이션, 백업, 모니터링, CI/CD</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>환경별(개발/스테이징/운영) DB 설정을 분리한다.</li>
              <li>마이그레이션으로 스키마 변경을 안전하게 관리한다.</li>
              <li>DB 백업과 복원 전략을 이해한다.</li>
              <li>모니터링과 성능 최적화 방법을 파악한다.</li>
              <li>CI/CD 파이프라인에서 DB를 관리한다.</li>
            </ul>
          </div>

          <h2>1. 환경 분리</h2>

          <h3>1.1 환경별 설정</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>환경</th><th>용도</th><th>DB</th><th>데이터</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>개발(Development)</strong></td><td>로컬 개발</td><td>로컬 MySQL/Docker</td><td>테스트 데이터</td></tr>
              <tr><td><strong>스테이징(Staging)</strong></td><td>배포 전 테스트</td><td>운영과 유사한 환경</td><td>익명화된 운영 데이터</td></tr>
              <tr><td><strong>운영(Production)</strong></td><td>실제 서비스</td><td>클라우드 관리형 DB</td><td>실제 사용자 데이터</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">환경변수 관리</div>
            <pre><code>{`# .env.development (로컬)
DATABASE_URL="mysql://root:password@localhost:3306/school"
NODE_ENV=development

# .env.staging (스테이징)
DATABASE_URL="mysql://app_user:stg_pass@staging-db.example.com:3306/school"
NODE_ENV=staging

# .env.production (운영)
DATABASE_URL="mysql://app_user:prod_pass@prod-db.example.com:3306/school"
NODE_ENV=production

# ⚠️ .gitignore에 반드시 추가:
# .env
# .env.*`}</code></pre>
          </div>

          <h2>2. 마이그레이션 (Migration)</h2>

          <h3>2.1 마이그레이션이란?</h3>
          <p>
            <strong>마이그레이션</strong>은 DB 스키마 변경 사항을 <strong>버전 관리</strong>하는 방법입니다.
            코드를 Git으로 관리하듯, 테이블 구조 변경도 마이그레이션 파일로 추적합니다.
          </p>

          <div className="code-block">
            <div className="code-header">마이그레이션 없이 vs 있을 때</div>
            <pre><code>{`❌ 마이그레이션 없이:
  - "어제 ALTER TABLE 했는데 뭐 바꿨더라?"
  - "운영 서버에도 같은 변경 적용했나?"
  - "다른 개발자 DB에는 이 컬럼이 없네?"

✅ 마이그레이션 사용:
  - 모든 스키마 변경이 파일로 기록됨
  - 순서대로 실행하면 동일한 DB 구조 보장
  - 롤백으로 변경 취소 가능
  - 코드 리뷰에서 스키마 변경 검토 가능`}</code></pre>
          </div>

          <h3>2.2 Prisma 마이그레이션</h3>
          <div className="code-block">
            <div className="code-header">Prisma 마이그레이션 명령어</div>
            <pre><code>{`# 스키마 변경 후 마이그레이션 생성
npx prisma migrate dev --name add_phone_to_students

# 생성된 파일:
# prisma/migrations/
#   20240315_add_phone_to_students/
#     migration.sql  ← ALTER TABLE students ADD COLUMN phone VARCHAR(20);

# 운영 환경에 적용
npx prisma migrate deploy

# 현재 상태 확인
npx prisma migrate status`}</code></pre>
          </div>

          <h3>2.3 수동 마이그레이션 (SQL)</h3>
          <div className="code-block">
            <div className="code-header">마이그레이션 파일 예시</div>
            <pre><code>{`-- migrations/001_create_users.sql
CREATE TABLE IF NOT EXISTS users (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrations/002_add_role_to_users.sql
ALTER TABLE users
ADD COLUMN role VARCHAR(20) DEFAULT 'user' AFTER password;

-- migrations/003_create_posts.sql
CREATE TABLE IF NOT EXISTS posts (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(200) NOT NULL,
    content    TEXT,
    user_id    INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`}</code></pre>
          </div>

          <h2>3. 백업과 복원</h2>

          <h3>3.1 MySQL 백업</h3>
          <div className="code-block">
            <div className="code-header">mysqldump 백업</div>
            <pre><code>{`# 전체 데이터베이스 백업
mysqldump -u root -p school > backup_20240315.sql

# 특정 테이블만 백업
mysqldump -u root -p school students courses > tables_backup.sql

# 구조만 백업 (데이터 제외)
mysqldump -u root -p --no-data school > schema_only.sql

# 압축 백업
mysqldump -u root -p school | gzip > backup_20240315.sql.gz`}</code></pre>
          </div>

          <h3>3.2 복원</h3>
          <div className="code-block">
            <div className="code-header">백업 복원</div>
            <pre><code>{`# SQL 파일로 복원
mysql -u root -p school < backup_20240315.sql

# 압축 파일 복원
gunzip < backup_20240315.sql.gz | mysql -u root -p school`}</code></pre>
          </div>

          <h3>3.3 자동 백업 스크립트</h3>
          <div className="code-block">
            <div className="code-header">backup.sh — 일별 자동 백업</div>
            <pre><code>{`#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mysql"
DB_NAME="school"

# 백업 실행
mysqldump -u root -p"$DB_PASS" $DB_NAME | gzip > "$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"

# 30일 이전 백업 삭제
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "백업 완료: ${DB_NAME}_${DATE}.sql.gz"

# crontab에 등록: 매일 새벽 2시 실행
# 0 2 * * * /scripts/backup.sh`}</code></pre>
          </div>

          <h2>4. 모니터링</h2>

          <h3>4.1 슬로우 쿼리 로그</h3>
          <div className="code-block">
            <div className="code-header">MySQL 슬로우 쿼리 설정</div>
            <pre><code>{`-- 슬로우 쿼리 로그 활성화 (1초 이상 걸리는 쿼리 기록)
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- 현재 실행 중인 쿼리 확인
SHOW PROCESSLIST;

-- 쿼리 실행 계획 분석
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';`}</code></pre>
          </div>

          <h3>4.2 주요 모니터링 지표</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>지표</th><th>설명</th><th>위험 신호</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>커넥션 수</strong></td><td>활성 DB 연결 수</td><td>max_connections 근접</td></tr>
              <tr><td><strong>슬로우 쿼리</strong></td><td>지정 시간 초과 쿼리</td><td>급격히 증가</td></tr>
              <tr><td><strong>디스크 사용량</strong></td><td>데이터 저장 공간</td><td>80% 이상 사용</td></tr>
              <tr><td><strong>복제 지연</strong></td><td>마스터-슬레이브 간 지연</td><td>수 초 이상 지연</td></tr>
              <tr><td><strong>QPS</strong></td><td>초당 쿼리 수</td><td>평상시 대비 급격한 변화</td></tr>
            </tbody>
          </table>

          <h2>5. CI/CD와 DB</h2>

          <div className="code-block">
            <div className="code-header">GitHub Actions — DB 마이그레이션 자동화</div>
            <pre><code>{`name: Deploy with Migration
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm ci

      # 1. 마이그레이션 실행 (스키마 변경 적용)
      - name: Run DB migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

      # 2. 애플리케이션 배포
      - name: Deploy application
        run: npm run deploy`}</code></pre>
          </div>

          <h2>6. 성능 최적화 팁</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>방법</th><th>설명</th><th>효과</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>인덱스 추가</strong></td><td>자주 검색하는 컬럼에 인덱스</td><td>조회 속도 10~100배 향상</td></tr>
              <tr><td><strong>커넥션 풀</strong></td><td>연결 재사용</td><td>연결 생성 오버헤드 제거</td></tr>
              <tr><td><strong>캐싱 (Redis)</strong></td><td>자주 읽는 데이터를 메모리에 캐시</td><td>DB 부하 대폭 감소</td></tr>
              <tr><td><strong>N+1 해결</strong></td><td>JOIN 또는 eager loading 사용</td><td>쿼리 수 대폭 감소</td></tr>
              <tr><td><strong>읽기 복제본</strong></td><td>읽기 전용 복제 서버 추가</td><td>읽기 부하 분산</td></tr>
              <tr><td><strong>쿼리 최적화</strong></td><td>EXPLAIN으로 분석, 불필요한 SELECT * 제거</td><td>응답 시간 단축</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>환경 분리</strong>: 개발/스테이징/운영을 분리하고 환경변수로 설정 관리.</li>
              <li><strong>마이그레이션</strong>: 스키마 변경을 버전 관리하여 팀 협업과 배포를 안전하게.</li>
              <li><strong>백업</strong>: 자동 백업 + 복원 테스트를 정기적으로 수행.</li>
              <li><strong>모니터링</strong>: 슬로우 쿼리, 커넥션 수, 디스크 사용량을 지속 관찰.</li>
              <li><strong>CI/CD</strong>: 마이그레이션을 배포 파이프라인에 포함하여 자동화.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 마이그레이션이 필요한 이유와 장점을 설명하세요.</p>
            <p><strong>문제 2.</strong> mysqldump로 school DB를 백업하고 복원하는 명령어를 작성하세요.</p>
            <p><strong>문제 3.</strong> 웹-DB 연동 서비스의 성능을 최적화하는 방법 3가지를 제시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/web/auth-security" className="lesson-nav-btn prev">&larr; 인증과 보안</Link>
            <Link to="/references" className="lesson-nav-btn next">참고자료 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default DeployOps;
