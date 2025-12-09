import { test, expect } from '@playwright/test';

test.describe('Credit Application Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display form title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Заявка на кредит' })).toBeVisible();
  });

  test('should show step 1 initially', async ({ page }) => {
    await expect(page.getByText('Шаг 1 из 6')).toBeVisible();
    await expect(page.getByText('Основная информация')).toBeVisible();
  });

  test('should display loan type selector', async ({ page }) => {
    await expect(page.getByText('Тип кредита')).toBeVisible();
  });

  test('should show mortgage fields when mortgage is selected', async ({ page }) => {
    // Select mortgage type
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Ипотека' }).click();

    // Should show mortgage-specific fields
    await expect(page.getByText('Данные недвижимости')).toBeVisible();
    await expect(page.getByText('Стоимость недвижимости')).toBeVisible();
  });

  test('should show car fields when car loan is selected', async ({ page }) => {
    // Select car loan type
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Автокредит' }).click();

    // Should show car-specific fields
    await expect(page.getByText('Данные автомобиля')).toBeVisible();
    await expect(page.getByText('Марка автомобиля')).toBeVisible();
  });

  test('should navigate to step 2 after filling step 1', async ({ page }) => {
    // Fill step 1 fields
    await page.getByLabel('Сумма кредита').fill('500000');
    await page.getByLabel('Срок кредита').fill('24');
    await page.getByLabel('Цель кредита').fill('Покупка бытовой техники для дома');

    // Click next
    await page.getByRole('button', { name: 'Далее' }).click();

    // Should be on step 2
    await expect(page.getByText('Шаг 2 из 6')).toBeVisible();
    await expect(page.getByText('Персональные данные')).toBeVisible();
  });

  test('should navigate back from step 2 to step 1', async ({ page }) => {
    // Fill step 1 and go to step 2
    await page.getByLabel('Сумма кредита').fill('500000');
    await page.getByLabel('Срок кредита').fill('24');
    await page.getByLabel('Цель кредита').fill('Покупка бытовой техники для дома');
    await page.getByRole('button', { name: 'Далее' }).click();

    // Wait for step 2
    await expect(page.getByText('Шаг 2 из 6')).toBeVisible();

    // Click back
    await page.getByRole('button', { name: 'Назад' }).click();

    // Should be on step 1
    await expect(page.getByText('Шаг 1 из 6')).toBeVisible();
  });

  test('should show validation errors when required fields are empty', async ({ page }) => {
    // Try to proceed without filling required fields
    await page.getByRole('button', { name: 'Далее' }).click();

    // Should show validation errors
    await expect(page.getByText('Укажите сумму кредита')).toBeVisible();
  });

  test('should display personal data fields on step 2', async ({ page }) => {
    // Navigate to step 2
    await page.getByLabel('Сумма кредита').fill('500000');
    await page.getByLabel('Срок кредита').fill('24');
    await page.getByLabel('Цель кредита').fill('Покупка бытовой техники для дома');
    await page.getByRole('button', { name: 'Далее' }).click();

    // Check for personal data fields
    await expect(page.getByText('Фамилия')).toBeVisible();
    await expect(page.getByText('Имя')).toBeVisible();
    await expect(page.getByText('Отчество')).toBeVisible();
    await expect(page.getByText('Дата рождения')).toBeVisible();
  });

  test('should display INN field with 12-digit mask', async ({ page }) => {
    // Navigate to step 2
    await page.getByLabel('Сумма кредита').fill('500000');
    await page.getByLabel('Срок кредита').fill('24');
    await page.getByLabel('Цель кредита').fill('Покупка бытовой техники для дома');
    await page.getByRole('button', { name: 'Далее' }).click();

    // Check for INN field
    const innField = page.getByLabel('ИНН');
    await expect(innField).toBeVisible();

    // INN should accept 12 digits
    await innField.fill('123456789012');
    await expect(innField).toHaveValue('123456789012');
  });
});
