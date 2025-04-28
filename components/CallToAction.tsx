import React from 'react';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <div className="bg-[#0A0F23]">
      <div className="w-full border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative rounded-2xl bg-[#181F38] overflow-visible">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Текстовый контент */}
            <div className="p-8 lg:p-16 lg:max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Начнём?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Закажите работу прямо сейчас и получите результат в кратчайшие сроки
              </p>
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#454CEE] rounded-full hover:bg-[#3339AA] transition-colors">
                Заказать работу
              </button>
            </div>

            {/* Изображение */}
            <div className="relative lg:absolute lg:right-0 lg:-top-24 lg:h-[calc(100%_+_96px)] w-full lg:w-1/2">
              <Image
                src="/sergey.webp"
                alt="Студент"
                fill
                style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                className="rounded-b-2xl lg:rounded-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 