export const prices = {
  'Реферат': {
    '10': 200,
    '20': 350,
    '30': 500,
    '40': 650,
  },
  'Доклад': {
    '10': 250,
    '20': 400,
    '30': 550,
    '40': 700,
  },
  'СРС': {
    '10': 300,
    '20': 450,
    '30': 600,
    '40': 750,
  },
  'Курсовая': {
    '10': 500,
    '20': 800,
    '30': 1100,
    '40': 1400,
  },
};

export default function PriceList() {
  return (
    <div className="py-24 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Прайс-лист
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Цены указаны в сомах. Готовые работы доступны за 50% от стоимости.
          </p>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Тип работы
                </th>
                {['10', '20', '30', '40'].map((pages) => (
                  <th
                    key={pages}
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    {pages} стр.
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {Object.entries(prices).map(([type, pagePrices]) => (
                <tr key={type} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {type}
                  </td>
                  {Object.values(pagePrices).map((price, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                    >
                      {price} сом
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-600 dark:text-gray-300">
            * Готовые работы из базы доступны со скидкой 50%
          </p>
        </div>
      </div>
    </div>
  );
} 