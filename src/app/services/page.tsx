'use client';
import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, useState } from 'react';
import Link from 'next/link';
import Blinkingtext from '@/components/utils/BlinkingText';
import { services } from '@/services';
import { TypeService } from '@/services';
import Image from 'next/image';
// import Carousel from '@/components/utils/Carousel';

export default function Services() {
  const [serviceInput, setServiceInput] = useState('');
  const [filteredServices, setFilteredServices] = useState<TypeService[] | null | undefined>(
    services
  );
  const validServices = Array.isArray(filteredServices) ? filteredServices : [];
  const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> &
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    const maxLength = 30;
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (inputValue.length > maxLength) {
      setError(`Input cannot exceed ${maxLength} characters.`);
      return;
    }

    if (!regex.test(inputValue)) {
      setError('Only alphanumeric characters are allowed.');
      return;
    }

    setError(''); // Clear any previous errors
    setServiceInput(inputValue);

    if (inputValue.trim() === '') {
      setHighlightIndexes([]);
    } else {
      const indexes: number[] = [];
      services.forEach((service) => {
        service.title.split('').forEach((char, index) => {
          if (
            inputValue[index]?.toLowerCase() === char.toLowerCase() &&
            inputValue.length > index
          ) {
            indexes.push(index);
          }
        });
      });
      setHighlightIndexes(indexes);
    }
  };

  const handleSearch = () => {
    if (serviceInput.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(serviceInput.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <section id='services' className='h-full w-screen pt-36 sm:pt-28 px-10 sm:px-24 flex flex-col'>
      {/* Header Section */}
      <section className=' pb-5  h-fit flex flex-col sm:flex-row  sm:justify-between sm:items-center '>
        <div className='flex flex-col  sm:w-2/4 justify-between h-[80vh] items-start'>
          <div className='flex flex-col '>
            <h2 className='text-3xl sm:text-4xl text-gray-800 font-clashDisplayRegular'>
              My Services:
            </h2>
            <p className='text-lg indent-10 text-justify text-gray-600 max-w-3xl font-satoshiRegular'>
              I provide a wide range of professional services in the web development domain,
              ensuring high-quality, modern, and functional solutions tailored to your needs.
            </p>
          </div>
          <div className='flex flex-col-reverse w-full  sm:h-2/4 justify-between'>
            <div className='bg-white  w-full flex items-center sm:gap-4 rounded-full px-4 py-2 shadow-lg max-w-lg'>
              <input
                type='search'
                className='text-sm sm:text-base bg-transparent w-2/4 flex-grow outline-none placeholder-gray-400'
                value={serviceInput}
                placeholder='Search a service'
                onChange={handleInputChange}
                spellCheck={false}
                data-ms-editor='true'
                aria-label='Search a service'
              />
              <button
                type='button'
                className={`py-1 px-2 font-satoshiBold tracking-wider rounded-full transition ${
                  serviceInput
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleSearch}
                disabled={!serviceInput}
                aria-label='search'
              >
                Search
              </button>
              <style jsx>{`
                input[type='search']::-webkit-search-cancel-button {
                  -webkit-appearance: none;
                  appearance: none;
                }
              `}</style>
            </div>
            {error && <p className='text-red-500 px-2'>{error}</p>}
            <div>
              <h2 className='text-3xl font-clashDisplayRegular'>What I serve:</h2>
              <div>
                <Blinkingtext texts={services.map((s) => s.title)} />
              </div>
            </div>
          </div>
        </div>
        <div className='hidden sm:block'>
          <video
            src='/assets/videos/workingVideo.mp4'
            autoPlay
            loop
            muted
            height={360}
            width={640}
            className='w-[260px] h-500px]'
          >
            Your browser does not support video tag
          </video>
        </div>
      </section>

      {/* Services List */}
      <div className='flex flex-col w-full h-fit '>
        {validServices.length > 0 &&
          serviceInput === '' &&
          // (
          //   <Carousel key={Math.random() * 10000} services={validServices} />
          // )
          validServices.map((service) => (
            <section
              key={service.id}
              className='bg-white px-4 py-20 border-b-8 h-fit  flex flex-col gap-10 sm:gap-0 sm:flex-row sm:justify-between items-start border-gray-500 '
            >
              <div className='sm:w-2/3 h-fit z-50 lg:h-screen flex flex-col gap-10  justify-between'>
                <h3 className='w-fit text-3xl sm:text-4xl font-clashDisplayMedium text-gray-800 mb-4'>
                  {service.title.split('').map((char, index) => (
                    <span
                      key={index}
                      className={highlightIndexes.includes(index) ? 'bg-green-200 ' : ''}
                    >
                      {char}
                    </span>
                  ))}
                </h3>
                <ul className='list-disc pl-6 space-y-2 text-gray-600 text-lg sm:text-2xl'>
                  {service.description.map((desc, index) => (
                    <li key={index} className='font-satoshiRegular'>
                      {desc}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.id}`} className='w-fit'>
                  <button
                    type='button'
                    className='mt-6 bg-green-500 font-satoshiBold hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105'
                  >
                    Learn More
                  </button>
                </Link>
                <div className='bottom-0'>
                  <p className='font-satoshiRegular'>
                    Have questions about this?{' '}
                    <Link href={`/#contact`} className='text-blue-700'>
                      click here
                    </Link>{' '}
                    to contact me directly.
                  </p>
                  <hr />
                </div>
              </div>
              <div className=' w-fit h-fit flex items-center justify-center sm:justify-end'>
                {service.image &&
                  service.image.map(({ src, txt }) => (
                    <Image
                      key={service.id}
                      src={src}
                      alt={txt}
                      height={5000}
                      width={5000}
                      unoptimized
                      className='w-full h-full sm:w-4/5 sm:h-4/5'
                    />
                  ))}
              </div>
            </section>
          ))}
      </div>
    </section>
  );
}
