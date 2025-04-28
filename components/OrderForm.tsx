'use client';

import { useState } from 'react';
import { prices } from './PriceList';

const workTypes = ['Реферат', 'Доклад', 'СРС', 'Курсовая'];
const pageOptions = ['10', '20', '30', '40'];

export default function OrderForm() {
  const [formData, setFormData] = useState({
    topic: '',
    type: workTypes[0],
    pages: pageOptions[0],
    title: {
      studentName: '',
      university: '',
      faculty: '',
      group: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('title.')) {
      const titleField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          [titleField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div id="order" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Заказать работу
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Заполните форму ниже, и мы сгенерируем вашу работу в течение 5 минут
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Тема работы
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Тип работы
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {workTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pages" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Количество страниц
                </label>
                <select
                  name="pages"
                  id="pages"
                  required
                  value={formData.pages}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {pageOptions.map((pages) => (
                    <option key={pages} value={pages}>
                      {pages} страниц
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Данные для титульного листа
              </h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ФИО студента
                  </label>
                  <input
                    type="text"
                    name="title.studentName"
                    id="studentName"
                    required
                    value={formData.title.studentName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ВУЗ
                  </label>
                  <input
                    type="text"
                    name="title.university"
                    id="university"
                    required
                    value={formData.title.university}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Факультет
                  </label>
                  <input
                    type="text"
                    name="title.faculty"
                    id="faculty"
                    required
                    value={formData.title.faculty}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Группа
                  </label>
                  <input
                    type="text"
                    name="title.group"
                    id="group"
                    required
                    value={formData.title.group}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Заказать за {prices[formData.type][formData.pages]} сом
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 