'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  DocumentIcon,
  PresentationChartBarIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  UserIcon,
  UserGroupIcon,
  AcademicCapIcon as TeacherIcon,
  PencilIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const workTypes = [
  { id: 'srs', name: 'СРС', icon: DocumentTextIcon },
  { id: 'referat', name: 'Реферат', icon: DocumentIcon },
  { id: 'doklad', name: 'Доклад', icon: PresentationChartBarIcon },
  { id: 'kursovaya', name: 'Курсовая', icon: AcademicCapIcon },
];

const languages = ['Русский', 'Казахский', 'Английский'];

const pageCountOptions = [
  { id: '0-10', label: 'до 10 страниц' },
  { id: '10-20', label: '10-20 страниц' },
  { id: '20-30', label: '20-30 страниц' },
  { id: '30+', label: 'от 30 страниц' },
];

export default function NewOrderPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [selectedPageCount, setSelectedPageCount] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Русский');
  const [showTitlePage, setShowTitlePage] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [titlePageData, setTitlePageData] = useState({
    university: '',
    studentName: '',
    studentGroup: '',
    teacherName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    type?: string;
    pageCount?: string;
    topic?: string;
    titlePage?: string;
    description?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Проверка типа работы
    if (!selectedType) {
      newErrors.type = 'Выберите тип работы';
    }

    // Проверка количества страниц
    if (!selectedPageCount) {
      newErrors.pageCount = 'Выберите количество страниц';
    }

    // Проверка темы
    if (!topic.trim()) {
      newErrors.topic = 'Введите тему работы';
    }

    // Проверка титульного листа
    if (showTitlePage) {
      const missingFields = [];
      if (!titlePageData.university.trim()) missingFields.push('университет');
      if (!titlePageData.studentName.trim()) missingFields.push('ФИО студента');
      if (!titlePageData.studentGroup.trim()) missingFields.push('группу');
      if (!titlePageData.teacherName.trim()) missingFields.push('ФИО преподавателя');
      
      if (missingFields.length > 0) {
        newErrors.titlePage = `Заполните ${missingFields.join(', ')}`;
      }
    }

    // Проверка описания
    if (showDescription && !description.trim()) {
      newErrors.description = 'Добавьте пожелания к работе';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePlan = async () => {
    if (!validateForm()) {
      // Прокрутка к первой ошибке
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        type: selectedType,
        pageCount: selectedPageCount,
        language: selectedLanguage,
        topic,
        description: showDescription ? description : null,
        titlePage: showTitlePage ? titlePageData : null
      };
      
      console.log('Generating plan with data:', orderData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/dashboard');
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => (
    message ? (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm flex items-center gap-1 mt-2 error-message"
      >
        <ExclamationCircleIcon className="w-4 h-4" />
        {message}
      </motion.p>
    ) : null
  );

  return (
    <div className="min-h-screen bg-[#0A0F23] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Сгенерировать</h1>
          <p className="text-xl text-gray-400">Что бы Вы хотели создать сегодня?</p>
        </div>

        {/* Тип работы */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedType(type.id);
                  setErrors({ ...errors, type: undefined });
                }}
                className={`p-6 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-[#454CEE] text-white'
                    : 'bg-[#181F38] text-gray-400 hover:bg-[#242B44]'
                } ${errors.type ? 'ring-2 ring-red-500' : ''}`}
              >
                <type.icon className={`w-8 h-8 ${
                  selectedType === type.id ? 'text-white' : 'text-[#454CEE]'
                }`} />
                <span className={`font-medium ${
                  selectedType === type.id ? 'text-white' : 'text-gray-400'
                }`}>{type.name}</span>
              </motion.button>
            ))}
          </div>
          <ErrorMessage message={errors.type} />
        </div>

        <div className="flex gap-4 mb-8">
          {/* Количество страниц */}
          <div className="flex-1">
            <div className="relative">
              <select
                value={selectedPageCount}
                onChange={(e) => {
                  setSelectedPageCount(e.target.value);
                  setErrors({ ...errors, pageCount: undefined });
                }}
                className={`w-full bg-[#181F38] text-white rounded-lg pl-4 pr-10 py-3 appearance-none cursor-pointer hover:bg-[#242B44] transition-colors border ${
                  errors.pageCount ? 'border-red-500' : 'border-[#242B44]'
                } focus:border-[#454CEE] focus:outline-none`}
              >
                <option value="">Количество страниц</option>
                {pageCountOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-[#181F38]">
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <ErrorMessage message={errors.pageCount} />
          </div>

          {/* Язык работы */}
          <div className="flex-1 relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-[#181F38] text-white rounded-lg pl-4 pr-10 py-3 appearance-none cursor-pointer hover:bg-[#242B44] transition-colors border border-[#242B44] focus:border-[#454CEE] focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-[#181F38]">
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Тема работы */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <PencilIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setErrors({ ...errors, topic: undefined });
              }}
              placeholder="Введите тему или описание работы"
              className={`w-full bg-[#181F38] text-white rounded-lg pl-12 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#454CEE] transition-all border ${
                errors.topic ? 'border-red-500' : 'border-[#242B44]'
              }`}
            />
          </div>
          <ErrorMessage message={errors.topic} />
        </div>

        {/* Переключатели */}
        <div className="mb-8 flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showTitlePage}
                onChange={(e) => setShowTitlePage(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#181F38] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#454CEE]"></div>
            </div>
            <span className="text-white font-medium">Титульный</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showDescription}
                onChange={(e) => setShowDescription(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#181F38] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#454CEE]"></div>
            </div>
            <span className="text-white font-medium">Пожелания</span>
          </label>
        </div>

        {/* Данные титульного листа */}
        {showTitlePage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(titlePageData).map(([key, value]) => (
                <div key={key} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {key === 'university' && <BuildingLibraryIcon className="w-5 h-5 text-gray-400" />}
                    {key === 'studentName' && <UserIcon className="w-5 h-5 text-gray-400" />}
                    {key === 'studentGroup' && <UserGroupIcon className="w-5 h-5 text-gray-400" />}
                    {key === 'teacherName' && <TeacherIcon className="w-5 h-5 text-gray-400" />}
                  </div>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setTitlePageData({ ...titlePageData, [key]: e.target.value });
                      setErrors({ ...errors, titlePage: undefined });
                    }}
                    placeholder={
                      key === 'university' ? 'Название университета' :
                      key === 'studentName' ? 'ФИО студента' :
                      key === 'studentGroup' ? 'Группа' :
                      'ФИО преподавателя'
                    }
                    className={`w-full bg-[#181F38] text-white rounded-lg pl-12 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#454CEE] transition-all border ${
                      errors.titlePage && !value ? 'border-red-500' : 'border-[#242B44]'
                    }`}
                  />
                </div>
              ))}
            </div>
            <ErrorMessage message={errors.titlePage} />
          </motion.div>
        )}

        {/* Поле для описания работы */}
        {showDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute left-4 top-4">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400" />
              </div>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: undefined });
                }}
                placeholder="Опишите ваши пожелания к работе..."
                className={`w-full bg-[#181F38] text-white rounded-lg pl-12 pr-4 py-3 min-h-[120px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#454CEE] transition-all border ${
                  errors.description ? 'border-red-500' : 'border-[#242B44]'
                } resize-y`}
              />
            </div>
            <ErrorMessage message={errors.description} />
          </motion.div>
        )}

        {/* Кнопка генерации */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 transition-all duration-300 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Генерация...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 animate-pulse" />
              Создать план
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
} 