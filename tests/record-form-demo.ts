import { chromium } from 'playwright';

async function recordFormDemo() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: {
      dir: './test-videos/',
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  // Navigate to the form
  await page.goto('http://localhost:5175/');
  await page.waitForTimeout(1000);

  console.log('=== Шаг 1: Тип страхования ===');

  // Fill Step 1
  await page.getByTestId('insuranceType-casco').click();
  await page.waitForTimeout(500);

  // Set start date
  await page.getByRole('textbox', { name: 'Дата начала действия' }).fill('2025-01-01');
  await page.waitForTimeout(500);

  // Set coverage amount
  await page.getByRole('spinbutton', { name: 'Страховая сумма (руб.)' }).fill('1000000');
  await page.waitForTimeout(500);

  // Set deductible
  await page.getByRole('spinbutton', { name: 'Франшиза (руб.)' }).fill('50000');
  await page.waitForTimeout(500);

  // Go to next step
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.waitForTimeout(1000);

  console.log('=== Шаг 2: Данные страхователя ===');

  // Fill personal data
  await page.getByRole('textbox', { name: 'Фамилия' }).fill('Иванов');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Имя' }).fill('Иван');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Отчество' }).fill('Иванович');
  await page.waitForTimeout(500);

  // Fill birth date
  await page.getByRole('textbox', { name: 'Дата рождения' }).fill('1985-05-15');
  await page.waitForTimeout(500);

  // Fill passport
  await page.getByRole('textbox', { name: 'Серия' }).fill('1234');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Номер' }).fill('567890');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Дата выдачи' }).fill('2010-01-20');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Кем выдан' }).fill('ОВД Центрального района');
  await page.waitForTimeout(500);

  // Fill contacts
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+7 (999) 123-45-67');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Email' }).fill('ivanov@example.com');
  await page.waitForTimeout(500);

  // Go to next step
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.waitForTimeout(1000);

  console.log('=== Шаг 3: Объект страхования (Транспортное средство) ===');

  // Fill vehicle data
  await page.getByRole('textbox', { name: 'VIN номер' }).fill('WDB1234567890123');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Марка' }).fill('Mercedes-Benz');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Модель' }).fill('E-Class');
  await page.waitForTimeout(300);
  await page.getByRole('spinbutton', { name: 'Год выпуска' }).fill('2020');
  await page.waitForTimeout(300);
  await page.getByRole('spinbutton', { name: 'Пробег (км)' }).fill('50000');
  await page.waitForTimeout(300);
  await page.getByRole('spinbutton', { name: 'Мощность двигателя (л.с.)' }).fill('250');
  await page.waitForTimeout(300);
  await page.getByRole('spinbutton', { name: 'Рыночная стоимость (руб.)' }).fill('3500000');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Гос. номер' }).fill('А123БВ777');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Номер СТС' }).fill('77 00 123456');
  await page.waitForTimeout(500);

  // Check anti-theft system
  await page.getByTestId('vehicle.hasAntiTheft').click();
  await page.waitForTimeout(500);

  // Go to next step
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.waitForTimeout(1000);

  console.log('=== Шаг 4: Водители ===');

  // Add a driver
  await page.getByRole('button', { name: '+ Добавить водителя' }).click();
  await page.waitForTimeout(500);

  // Fill driver data
  await page.getByRole('textbox', { name: 'ФИО' }).fill('Петров Петр Петрович');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Дата рождения' }).fill('1990-03-20');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Номер ВУ' }).fill('77 00 654321');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Дата выдачи ВУ' }).fill('2012-06-15');
  await page.waitForTimeout(500);

  // Go to next step
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.waitForTimeout(1000);

  console.log('=== Шаг 5: История ===');

  // Check previous insurance
  await page.getByTestId('hasPreviousInsurance').click();
  await page.waitForTimeout(500);

  // Fill previous insurance data
  await page.getByRole('textbox', { name: 'Страховая компания' }).fill('Росгосстрах');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Номер полиса' }).fill('РГС-123456');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Дата окончания' }).fill('2024-12-31');
  await page.waitForTimeout(500);

  // Add promo code
  await page.getByRole('textbox', { name: 'Промокод' }).fill('DISCOUNT10');
  await page.waitForTimeout(500);

  // Go to next step
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.waitForTimeout(1000);

  console.log('=== Шаг 6: Подтверждение ===');

  // Scroll to see calculations
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Check consents
  await page.getByTestId('agreePersonalData').click();
  await page.waitForTimeout(300);
  await page.getByTestId('agreeTerms').click();
  await page.waitForTimeout(300);
  await page.getByTestId('agreeElectronicPolicy').click();
  await page.waitForTimeout(300);
  await page.getByTestId('confirmAccuracy').click();
  await page.waitForTimeout(500);

  // Fill confirmation code
  await page.getByRole('textbox', { name: 'Код подтверждения (6 цифр)' }).fill('123456');
  await page.waitForTimeout(1000);

  // Wait to show final state
  await page.waitForTimeout(2000);

  console.log('=== Демонстрация режима просмотра ===');

  // Switch to view mode
  await page.getByRole('button', { name: 'Просмотр' }).click();
  await page.waitForTimeout(1500);

  // In view mode, scroll through the page to show readonly state
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  // Final pause
  await page.waitForTimeout(1000);

  console.log('=== Запись завершена ===');

  // Close and save video
  await context.close();
  await browser.close();

  console.log('Видео сохранено в папку ./test-videos/');
}

recordFormDemo().catch(console.error);
