---
description: 
alwaysApply: true
---

---
description: 
alwaysApply: true
---

---
description: 
alwaysApply: true
---

---
description: 
alwaysApply: true
---

---
description: 
alwaysApply: true
---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


1. Strict Code Integrity: 명시적으로 수정을 요청한 파일 외에, 프로젝트의 다른 기존 코드나 스타일, 로직은 절대 건드리지 마라. (Do not modify existing code unless explicitly requested.)
2. Automatic Git Workflow: 모든 작업(파일 생성/수정)이 완료되면, 터미널에서 아래 명령어를 자동으로 순차 실행해라.
   - git add .
   - git commit -m "feat: updated by ai assistant"
   - git push origin main
3. Layout Consistency: 모든 텍스트 정렬은 기본적으로 'text-left'를 유지하고, 프로젝트의 기존 테마를 계승해라.
4. Mobile First: 모든 UI는 모바일 반응형을 기본으로 작성해라.
5. Error Prevention: 코드 수정 전 의존성을 확인하여 다른 페이지가 망가지지 않게 검토해라.
6. Tech Stack: UI는 Tailwind CSS를, 아이콘은 Lucide React를 우선 사용해라.
7. Component Logic: 기존 디자인 시스템을 최대한 재사용하여 코드 중복을 방지해라.
8. Response Style: 불필요한 설명은 생략하고, 효율적인 코드와 실행 명령어 위주로 답변해라.
