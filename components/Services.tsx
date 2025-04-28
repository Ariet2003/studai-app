import { 
  DocumentTextIcon,
  PresentationChartBarIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon
} from '@heroicons/react/24/solid';

const services = [
  {
    name: 'Реферат',
    description: 'Быстрое создание рефератов на любую тему с учетом всех требований к оформлению',
    icon: DocumentTextIcon,
    price: 'от 200 сом'
  },
  {
    name: 'Доклад',
    description: 'Подготовка структурированных докладов с презентационными материалами',
    icon: PresentationChartBarIcon,
    price: 'от 250 сом'
  },
  {
    name: 'СРС',
    description: 'Выполнение самостоятельных работ по различным дисциплинам',
    icon: ClipboardDocumentListIcon,
    price: 'от 200 сом'
  },
  {
    name: 'Курсовая работа',
    description: 'Написание курсовых работ с глубоким исследованием темы',
    icon: BookOpenIcon,
    price: 'от 400 сом'
  }
];

export default function Services() {
  return (
    <div className="bg-[#0A0F23]">
      <div className="w-full border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Наши услуги
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="relative rounded-2xl bg-[#181F38] p-8 transition-transform hover:scale-105"
            >
              <div className="mb-4">
                <span className="inline-flex rounded-lg bg-[#454CEE]/10 p-3">
                  <service.icon className="h-6 w-6 text-[#454CEE]" aria-hidden="true" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-8 text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-base leading-7 text-gray-300 mb-4">
                  {service.description}
                </p>
                <div className="inline-block rounded-full bg-[#0A0F23] px-4 py-2">
                  <p className="text-[#454CEE] font-semibold">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 