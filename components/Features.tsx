import { 
  ChartBarIcon, 
  ChatBubbleBottomCenterTextIcon, 
  ShieldCheckIcon, 
  DocumentDuplicateIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'SLA 99,98%',
    description: 'Гарантируем быстрый результат',
    icon: ChartBarIcon,
  },
  {
    name: 'Техподдержка 24/7',
    description: 'Поможем в любое время',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'ФЗ-152 РФ',
    description: 'Персональные данные защищены',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Более 1200 готовых работ',
    description: 'Можно купить за 50% стоимости',
    icon: DocumentDuplicateIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Обе партнерских программы включают в себя
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative rounded-2xl bg-white dark:bg-card-dark p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-4">
                <span className="inline-flex rounded-lg bg-primary-dark/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 