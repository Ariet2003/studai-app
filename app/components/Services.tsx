import React from 'react';

const Services = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Наши услуги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Карточка услуги 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Индивидуальное обучение
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Персональный подход к каждому студенту с учетом его уровня и целей обучения
            </p>
          </div>

          {/* Карточка услуги 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Групповые занятия
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Эффективное обучение в малых группах с интерактивным взаимодействием
            </p>
          </div>

          {/* Карточка услуги 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Онлайн консультации
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Удобные онлайн консультации для решения вопросов и поддержки в обучении
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 