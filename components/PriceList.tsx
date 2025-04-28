import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

// Экспортируем структуру цен для OrderForm
export const prices = {
  'Реферат': {
    '10': 200,
    '20': 300,
    '30': 600,
    '40': 1000,
  },
  'Доклад': {
    '10': 250,
    '20': 350,
    '30': 700,
    '40': 1100,
  },
  'Курсовая': {
    '10': 400,
    '20': 700,
    '30': 1000,
    '40': 1500,
  },
  'СРС': {
    '10': 200,
    '20': 300,
    '30': 600,
    '40': 1000,
  },
};

const priceCategories = [
  {
    name: 'Реферат',
    price: 'от 200 сом',
    features: [
      '1-10 страниц: 200 сом',
      '10-20 страниц: 300 сом',
      '20-30 страниц: 600 сом',
      '30-40 страниц: 1000 сом',
    ],
    description: 'Написание рефератов на любую тему'
  },
  {
    name: 'СРС',
    price: 'от 200 сом',
    features: [
      '1-10 страниц: 200 сом',
      '10-20 страниц: 300 сом',
      '20-30 страниц: 600 сом',
      '30-40 страниц: 1000 сом',
    ],
    description: 'Выполнение самостоятельных работ'
  },
  {
    name: 'Курсовая работа',
    price: 'от 400 сом',
    features: [
      '1-10 страниц: 400 сом',
      '10-20 страниц: 700 сом',
      '20-30 страниц: 1000 сом',
      '30-40 страниц: 1500 сом',
    ],
    description: 'Написание курсовых работ'
  },
  {
    name: 'Доклад',
    price: 'от 250 сом',
    features: [
      '1-10 страниц: 250 сом',
      '10-20 страниц: 350 сом',
      '20-30 страниц: 700 сом',
      '30-40 страниц: 1100 сом',
    ],
    description: 'Подготовка докладов'
  }
];

export default function PriceList() {
  return (
    <div className="bg-[#0A0F23]">
      <div className="w-full border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Прайс-лист
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Стоимость зависит от типа работы и количества страниц
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {priceCategories.map((category) => (
            <div
              key={category.name}
              className="relative rounded-2xl bg-[#181F38] p-8 transition-transform hover:scale-105"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <div className="inline-block rounded-full bg-[#0A0F23] px-4 py-2 mb-4">
                  <p className="font-semibold text-[#454CEE]">
                    {category.price}
                  </p>
                </div>
                <p className="text-gray-300">
                  {category.description}
                </p>
              </div>

              <ul className="space-y-4">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-3 text-[#454CEE]" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 