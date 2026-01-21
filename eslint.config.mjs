// eslint.config.mjs
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // ✅ Next 기본 ignore(원하면 유지)
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // ✅ 기본 JS 권장
  js.configs.recommended,

  // ✅ Next 권장 (Flat preset)
  ...nextVitals,
  ...nextTs,

  // ✅ TS 권장(추가로 가져가고 싶으면)
  // nextTs가 TS 규칙을 포함하긴 하지만, TS-eslint 추천도 함께 쓰려면 유지 가능
  ...tseslint.configs.recommended,

  // ✅ 프로젝트 공통 룰
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // ✅ Prettier를 ESLint에서 실행(저장 시 fixAll.eslint로 함께 정리됨)
      'prettier/prettier': 'error',

      // ✅ import 정렬
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // ✅ 사용하지 않는 변수(underscore 허용)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ✅ any 허용
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // ✅ 빌드/설정 파일은 느슨하게
  {
    files: ['**/*.config.*', '**/scripts/**', '**/next-env.d.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]);
