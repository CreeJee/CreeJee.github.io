# 개발 히스토리

## 2025-11-24

### 초기 구축
- GitHub Pages 기반 포트폴리오 웹사이트 구축
- 이력서 PDF 기반 콘텐츠 작성
- 기본 기능 구현:
  - 다크/라이트 테마 토글
  - 스크롤 네비게이션 (우측 점 인디케이터)
  - 아코디언 상세 업무 (details/summary)
  - 반응형 디자인

### 스크롤 네비게이션 개선
**문제**: Contact 섹션이 페이지 최하단에 있어 스크롤 네비게이션에서 활성화되지 않음

**해결**:
- `script.js`에 페이지 하단 감지 로직 추가
- `scrollY + innerHeight >= scrollHeight - 50` 조건으로 하단 감지
- 하단 도달 시 Contact 섹션 강제 활성화

### 타이포그래피 및 디자인 대폭 개선
**요구사항**: HR이 보기 편하도록 가독성 극대화

**변경사항**:
1. **섹션 타이틀 크기 증가**: 32px, font-weight: 700
2. **텍스트 크기 체계 정립**:
   - 회사명: 24px
   - 프로젝트명: 22px
   - 스킬/오픈소스: 20px
   - 본문: 16px
3. **섹션 배경 교차 적용**: `:nth-of-type(even)` 사용하여 짝수 섹션에 `--bg-tertiary` 배경색
4. **중요 콘텐츠 강조**: `strong` 태그에 `--highlight-color` 적용
5. **PC에서 섹션명 표시**: 스크롤 네비게이션 점에 섹션명 라벨 추가 (처음엔 항상 표시)

### Experience 섹션 일괄 토글 기능
**추가 기능**:
- Experience 섹션에 "모두 펼치기/모두 접기" 버튼 추가
- 모든 상세 업무를 한 번에 펼치거나 접을 수 있는 기능
- 버튼 텍스트가 상태에 따라 동적으로 변경

**레이아웃 이슈 수정**:
- 초기: 섹션 타이틀과 버튼이 모두 왼쪽에 배치됨
- 해결: `.section-header`에 `display: flex`, `justify-content: space-between` 적용
- 타이틀에 `flex: 1` 추가하여 버튼을 오른쪽 끝으로 배치

### CSS 구조 정리
- CSS 선택자 중복 확인 및 정리
- 미디어 쿼리 내 선택자와 일반 선택자 구분 명확화

### 스크롤 네비게이션 라벨 UX 개선
**문제**: 모든 라벨이 항상 표시되어 부자연스럽고 복잡해 보임

**1차 개선**:
- 라벨을 기본적으로 숨김 (`opacity: 0`)
- hover 시 또는 active 섹션일 때만 표시 (`opacity: 1`)
- 부드러운 전환 효과 적용 (`transition: 0.2s ease`)

**2차 개선 - 라벨 겹침 문제 해결**:
- 점들 간격 증가: 16px → 24px → 32px
- 라벨 크기 축소:
  - padding: 6px 14px → 4px 10px
  - font-size: 13px → 12px
- z-index 계층 구조 적용:
  - hover: z-index 10 (최상위)
  - active: z-index 5 (중간)
  - 기본: z-index 1 (하위)
- hover된 라벨이 항상 active 라벨보다 위에 표시되도록 보장

## 기술 스택
- HTML5 (Semantic HTML)
- CSS3 (CSS Variables, Flexbox, Media Queries)
- Vanilla JavaScript (ES6+)
- GitHub Pages (정적 호스팅)

## 주요 파일
- `index.html`: 메인 HTML 구조
- `styles.css`: 스타일 정의 (테마, 레이아웃, 반응형)
- `script.js`: 인터랙션 로직 (테마 토글, 스크롤 네비게이션, 토글 버튼)
