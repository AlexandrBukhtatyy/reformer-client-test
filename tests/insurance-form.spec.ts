import { test, expect } from '@playwright/test';

test.describe('Insurance Application Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the insurance application form
    await page.goto('http://localhost:5173'); // Assuming the app runs on port 5173
  });

  test('should render the first step of the form', async ({ page }) => {
    // Check if the first step is visible
    await expect(page.locator('h2:has-text("Шаг 1: Личная информация")')).toBeVisible();
    
    // Check if required fields are present
    await expect(page.locator('label:has-text("Фамилия*")')).toBeVisible();
    await expect(page.locator('label:has-text("Имя*")')).toBeVisible();
    await expect(page.locator('label:has-text("Отчество")')).toBeVisible();
    await expect(page.locator('label:has-text("Дата рождения*")')).toBeVisible();
    await expect(page.locator('label:has-text("Пол*")')).toBeVisible();
    await expect(page.locator('label:has-text("Номер телефона*")')).toBeVisible();
    await expect(page.locator('label:has-text("Email*")')).toBeVisible();
  });

  test('should allow filling the first step', async ({ page }) => {
    // Fill in the first step
    await page.fill('input[name="lastName"]', 'Иванов');
    await page.fill('input[name="firstName"]', 'Иван');
    await page.fill('input[name="middleName"]', 'Иванович');
    await page.fill('input[name="birthDate"]', '1990-01');
    await page.click('input[type="radio"][value="male"]');
    await page.fill('input[name="phone"]', '+79991234567');
    await page.fill('input[name="email"]', 'ivanov@example.com');

    // Click next button
    await page.click('button:has-text("Далее")');

    // Check if we moved to the second step
    await expect(page.locator('h2:has-text("Шаг 2: Документы")')).toBeVisible();
  });

  test('should validate required fields in the first step', async ({ page }) => {
    // Click next button without filling any fields
    await page.click('button:has-text("Далее")');

    // Check if validation errors are displayed
    const errorMessages = page.locator('span:has-text("Обязательное поле")');
    await expect(errorMessages).toHaveCount(5); // Expect 5 error messages
    
    // Check each error message individually
    await expect(errorMessages.nth(0)).toBeVisible();
    await expect(errorMessages.nth(1)).toBeVisible();
    await expect(errorMessages.nth(2)).toBeVisible();
    await expect(errorMessages.nth(3)).toBeVisible();
    await expect(errorMessages.nth(4)).toBeVisible();
  });

  test('should navigate between steps', async ({ page }) => {
    // Fill in the first step
    await page.fill('input[name="lastName"]', 'Иванов');
    await page.fill('input[name="firstName"]', 'Иван');
    await page.fill('input[name="middleName"]', 'Иванович');
    await page.fill('input[name="birthDate"]', '1990-01-01');
    await page.click('input[type="radio"][value="male"]');
    await page.fill('input[name="phone"]', '+79991234567');
    await page.fill('input[name="email"]', 'ivanov@example.com');

    // Go to step 2
    await page.click('button:has-text("Далее")');
    await expect(page.locator('h2:has-text("Шаг 2: Документы")')).toBeVisible();

    // Go back to step 1
    await page.click('button:has-text("Назад")');
    await expect(page.locator('h2:has-text("Шаг 1: Личная информация")')).toBeVisible();

    // Go to step 2 again
    await page.click('button:has-text("Далее")');
    await expect(page.locator('h2:has-text("Шаг 2: Документы")')).toBeVisible();
  });

  test('should fill all steps and submit the form', async ({ page }) => {
    // Fill Step 1
    await page.fill('input[name="lastName"]', 'Иванов');
    await page.fill('input[name="firstName"]', 'Иван');
    await page.fill('input[name="middleName"]', 'Иванович');
    await page.fill('input[name="birthDate"]', '1990-01-01');
    await page.click('input[type="radio"][value="male"]');
    await page.fill('input[name="phone"]', '+79991234567');
    await page.fill('input[name="email"]', 'ivanov@example.com');
    await page.click('button:has-text("Далее")');

    // Fill Step 2
    await page.fill('input[name="documentType"]', 'Паспорт');
    await page.fill('input[name="documentSeries"]', '1234');
    await page.fill('input[name="documentNumber"]', '567890');
    await page.fill('input[name="documentIssuedBy"]', 'ОВИР г. Москвы');
    await page.fill('input[name="documentIssueDate"]', '2010-01');
    await page.fill('input[name="documentDivisionCode"]', '770-001');
    await page.click('button:has-text("Далее")');

    // Fill Step 3
    await page.fill('input[name="address"]', 'г. Москва, ул. Тверская, д. 1');
    await page.click('button:has-text("Далее")');

    // Fill Step 4
    await page.fill('input[name="insuranceAmount"]', '1000000');
    await page.click('button:has-text("Далее")');

    // Fill Step 5
    await page.click('input[type="checkbox"][name="agree"]');
    await page.click('button:has-text("Далее")');

    // Fill Step 6
    await page.click('button:has-text("Отправить")');

    // Check if submission was successful (you might need to adjust this based on your app's behavior)
    await expect(page.locator('text=Форма успешно отправлена')).toBeVisible();
  });
});