import React from 'react';
import { 
  RocketLaunchIcon,
  CircleStackIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Масштабирование «на лету»',
    description: 'Наша система автоматически адаптируется под ваши потребности, обеспечивая мгновенную обработку заказов в любом количестве.',
    icon: RocketLaunchIcon
  },
  {
    title: 'Устойчивая архитектура',
    description: 'Используем передовые ИИ технологии для создания качественных академических работ с учетом всех требований.',
    icon: CircleStackIcon
  },
  {
    title: 'Поддержка 24/7',
    description: 'Автоматизированная система поддержки доступна круглосуточно. Мгновенные ответы на ваши вопросы в любое время.',
    icon: ChatBubbleBottomCenterTextIcon
  }
];

export default function Features() {
  return (
    <div id="features" className="bg-[#0A0F23]">
      <div className="w-full border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-white sm:text-4xl mb-16">
          Почему нас выбирают
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative rounded-2xl bg-[#181F38] p-8 ${
                index === 1 ? 'lg:col-start-2' : index === 2 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {feature.description}
                  </p>
                </div>
                
                <div className="relative w-32 h-32 flex-shrink-0 rounded-full bg-[#0A0F23] flex items-center justify-center">
                  <feature.icon className="h-16 w-16 text-[#454CEE]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 