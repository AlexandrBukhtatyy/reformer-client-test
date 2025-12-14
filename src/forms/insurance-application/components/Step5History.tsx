// Step 5: History and Additional Information
import type { GroupNodeWithControls, ArrayNode } from '@reformer/core';
import { useFormArray } from '@reformer/ui';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { InsuranceApplicationForm, Claim } from '../types';
import { defaultClaim } from '../types';

interface Step5Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

const claimTypeOptions = [
  { value: 'accident', label: 'ДТП' },
  { value: 'theft', label: 'Угон/кража' },
  { value: 'damage', label: 'Повреждение' },
  { value: 'natural_disaster', label: 'Стихийное бедствие' },
  { value: 'medical', label: 'Медицинский случай' },
  { value: 'other', label: 'Другое' },
];

const referralSourceOptions = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friends', label: 'Рекомендации друзей' },
  { value: 'tv', label: 'Телевидение' },
  { value: 'agent', label: 'Страховой агент' },
  { value: 'other', label: 'Другое' },
];

// Claim Item Component
function ClaimItem({
  claim,
  index,
  onRemove,
}: {
  claim: GroupNodeWithControls<Claim>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Страховой случай {index + 1}</h4>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Удалить
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={claim.controls.date.withComponent(Input, {
            label: 'Дата события',
            type: 'date',
            testId: `claim${index}Date`,
          })}
          testId={`claim${index}Date`}
        />
        <FormField
          control={claim.controls.type.withComponent(Select, {
            label: 'Тип события',
            options: claimTypeOptions,
            placeholder: 'Выберите тип',
            testId: `claim${index}Type`,
          })}
          testId={`claim${index}Type`}
        />
        <FormField
          control={claim.controls.description.withComponent(Textarea, {
            label: 'Описание',
            placeholder: 'Опишите событие',
            testId: `claim${index}Description`,
          })}
          className="md:col-span-2"
          testId={`claim${index}Description`}
        />
        <FormField
          control={claim.controls.amount.withComponent(Input, {
            label: 'Сумма выплаты (₽)',
            type: 'number',
            placeholder: '100000',
            min: 0,
            testId: `claim${index}Amount`,
          })}
          testId={`claim${index}Amount`}
        />
        <FormField
          control={claim.controls.atFault.withComponent(Checkbox, {
            label: 'По вине страхователя',
            testId: `claim${index}AtFault`,
          })}
          testId={`claim${index}AtFault`}
        />
      </div>
    </div>
  );
}

export function Step5History({ control }: Step5Props) {
  const hasPreviousInsurance = control.controls.hasPreviousInsurance.value;
  const hadClaims = control.controls.hadClaims.value;

  // Claims array hook
  const claimsArray = useFormArray(control.controls.claims as ArrayNode<Claim>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 5: История и дополнительная информация</h2>

      {/* Previous Insurance Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Предыдущий полис</h3>

        <FormField
          control={control.controls.hasPreviousInsurance.withComponent(Checkbox, {
            label: 'Был ли полис ранее',
            testId: 'hasPreviousInsurance',
          })}
          testId="hasPreviousInsurance"
        />

        {hasPreviousInsurance && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {control.controls.previousInsurer.enabled && (
              <FormField
                control={control.controls.previousInsurer.withComponent(Input, {
                  label: 'Предыдущий страховщик',
                  placeholder: 'Название компании',
                  testId: 'previousInsurer',
                })}
                testId="previousInsurer"
              />
            )}
            {control.controls.previousPolicyNumber.enabled && (
              <FormField
                control={control.controls.previousPolicyNumber.withComponent(Input, {
                  label: 'Номер предыдущего полиса',
                  placeholder: 'XXX-000000',
                  testId: 'previousPolicyNumber',
                })}
                testId="previousPolicyNumber"
              />
            )}
            {control.controls.previousPolicyEndDate.enabled && (
              <FormField
                control={control.controls.previousPolicyEndDate.withComponent(Input, {
                  label: 'Дата окончания предыдущего полиса',
                  type: 'date',
                  testId: 'previousPolicyEndDate',
                })}
                testId="previousPolicyEndDate"
              />
            )}
          </div>
        )}
      </div>

      {/* Claims Section */}
      <div className="border-t pt-4 mt-4 space-y-4">
        <h3 className="text-lg font-medium">Страховые случаи</h3>

        <FormField
          control={control.controls.hadClaims.withComponent(Checkbox, {
            label: 'Были ли страховые случаи',
            testId: 'hadClaims',
          })}
          testId="hadClaims"
        />

        {hadClaims && control.controls.claims.enabled && (
          <>
            {claimsArray.items.map(({ control, index, id, remove }) => (
              <ClaimItem
                key={id}
                claim={control as GroupNodeWithControls<Claim>}
                index={index}
                onRemove={remove}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => claimsArray.add(defaultClaim)}
            >
              + Добавить страховой случай
            </Button>
          </>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="border-t pt-4 mt-4 space-y-4">
        <h3 className="text-lg font-medium">Дополнительная информация</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control.controls.promoCode.withComponent(Input, {
              label: 'Промокод',
              placeholder: 'PROMO2024',
              testId: 'promoCode',
            })}
            testId="promoCode"
          />
          <FormField
            control={control.controls.referralSource.withComponent(Select, {
              label: 'Откуда узнали о нас',
              options: referralSourceOptions,
              placeholder: 'Выберите источник',
              testId: 'referralSource',
            })}
            testId="referralSource"
          />
          <FormField
            control={control.controls.agentCode.withComponent(Input, {
              label: 'Код агента',
              placeholder: 'AGT-000',
              testId: 'agentCode',
            })}
            testId="agentCode"
          />
        </div>

        <FormField
          control={control.controls.additionalNotes.withComponent(Textarea, {
            label: 'Дополнительные комментарии',
            placeholder: 'Ваши пожелания...',
            rows: 4,
            testId: 'additionalNotes',
          })}
          testId="additionalNotes"
        />
      </div>
    </div>
  );
}
