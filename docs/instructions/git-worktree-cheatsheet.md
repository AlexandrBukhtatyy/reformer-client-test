# Git Worktree — шпаргалка

## Расклад worktree в проекте

| Путь | Ветка | Назначение |
|------|-------|------------|
| `D:/Work/test/reformer-client-test` | `react-hook-form` | основной worktree |
| `D:/Work/test/reformer-client-test-cloude` | `test-cloude` | linked worktree |
| `D:/Work/test/reformer-client-test-qwen` | `test-qwen` | linked worktree |
| `D:/Work/test/reformer-demo` | `demo` | linked worktree |

Все каталоги делят один `.git` — это linked worktrees, а не отдельные клоны.

## Просмотр

```powershell
git worktree list
git worktree list --porcelain
```

## Создание worktree

```powershell
# новый worktree на существующей ветке
git worktree add ../reformer-client-test-feature feature-branch

# новый worktree + новая ветка от main
git worktree add -b new-branch ../reformer-client-test-new main

# detached HEAD на конкретном коммите
git worktree add --detach ../reformer-client-test-snapshot 102de2a
```

## Удаление worktree

```powershell
git worktree remove ../reformer-client-test-cloude
git worktree remove --force ../reformer-client-test-cloude   # если есть локальные правки
git worktree prune                                            # вычистить осиротевшие записи
```

## Сброс одного worktree до состояния другого

Текущий = `react-hook-form` (на `102de2a`). Цель — привести `reformer-client-test-cloude` к этому состоянию.

**Hard reset ветки целевого worktree:**
```powershell
git -C D:/Work/test/reformer-client-test-cloude reset --hard react-hook-form
git -C D:/Work/test/reformer-client-test-cloude clean -fd
```

**Detached HEAD без переименования ветки:**
```powershell
git -C D:/Work/test/reformer-client-test-cloude checkout --detach react-hook-form
git -C D:/Work/test/reformer-client-test-cloude clean -fd
```

**Пересоздать ветку worktree от `react-hook-form`:**
```powershell
git -C D:/Work/test/reformer-client-test-cloude checkout -B test-cloude react-hook-form
git -C D:/Work/test/reformer-client-test-cloude clean -fd
```

> `clean -fd` сносит untracked. Добавь `-x` чтобы убрать и игнорируемые файлы (`node_modules`, `.beads/dolt/` и т.п.).

## Ограничения

- Одна ветка не может быть checked out одновременно в двух worktrees. Используй `--detach` или новую ветку.
- `git -C <path>` запускает команду в указанном worktree без `cd`.
- Hooks (`.git/hooks/`) общие на все worktrees.

## Полезное

```powershell
# узнать к какому worktree привязан текущий каталог
git rev-parse --show-toplevel
git rev-parse --git-common-dir   # путь к общему .git
git rev-parse --git-dir          # путь к .git/worktrees/<name> для linked

# заблокировать worktree от случайного prune
git worktree lock ../reformer-demo --reason "release branch"
git worktree unlock ../reformer-demo

# переместить worktree
git worktree move ../old-path ../new-path
```
