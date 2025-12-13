Создай форму на основе спецификации spec/insurance-application-form.md

Используй @reformer/ui для:

1. создания пошаговых форм (form-navigation)
2. создания масивов форм (form-array)

Используй MCP сервер reformer для:

1. получения документации (reformer://docs и reformer://api)
2. примеров кода (Creformer://examples)
3. решения возникших проблем (reformer://troubleshooting)
4. регистрации проблем возникший при работе (report_issue)

Форма должна:

- Быть пошаговой (6 шагов)
- Иметь отдельные файлы валидации для каждого шага
- Использовать useStepForm для навигации
- Поддерживать вычисляемые поля (endDate, age, experience)
- Иметь условную видимость полей
