# CLAUDE.md

Этот файл содержит руководство для Claude Code (claude.ai/code) при работе с кодом в этом репозитории.

## Обзор проекта

React + TypeScript + Vite приложение для создания сложных форм с использованием библиотеки ReFormer (`@reformer/core`, `@reformer/ui`). Проект использует компоненты shadcn/ui, адаптированные для интеграции с системой управления формами ReFormer.

## Команды

```bash
# Разработка
npm run dev          # Запуск Vite dev сервера

# Сборка и линтинг
npm run build        # Проверка TypeScript + сборка Vite
npm run lint         # ESLint

# E2E тесты (Playwright)
npx playwright test                        # Запуск всех тестов
npx playwright test tests/example.spec.ts  # Запуск конкретного файла
npx playwright test --project=chromium     # Запуск в конкретном браузере
```

## Архитектура

### Технологический стек

- **React 19** с TypeScript
- **Vite 7** — сборщик
- **ReFormer** (`@reformer/core`, `@reformer/ui`) — управление состоянием форм
- **Tailwind CSS 4** с `tw-animate-css` — стилизация
- **Radix UI** примитивы через shadcn/ui

### Алиасы путей

- `@/` соответствует `./src/` (настроено в `vite.config.ts`)

### Ключевые директории

- `src/components/ui/` — компоненты shadcn/ui, адаптированные для ReFormer
- `spec/` — спецификации полей форм в markdown (структура, валидация, зависимости полей)
- `tests/` — Playwright E2E тесты

### Спецификации форм

Спецификации в `spec/*.md` определяют:

- Типы полей, ключи и правила валидации
- Условную видимость полей (например, поля ипотеки при `loanType='mortgage'`)
- Вычисляемые поля и их зависимости
- Поведение полей (копирование, очистка, динамическая загрузка)

## MCP серверы

Проект настраивает два MCP сервера в `.mcp.json`:

- `reformer-mcp` — инструменты ReFormer
- `playwright` — автоматизация браузера Playwright
