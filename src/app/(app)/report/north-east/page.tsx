'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    const districts = [
        { name: 'EDMC', lastUpdatedAt: '22 Mar 2024', nextUpdateAt: '10 Sept 2024', link: '/report/east' },
        { name: 'DJB', lastUpdatedAt: '22 Mar 2024', nextUpdateAt: '10 Sept 2024', link: '/report/west' },
        { name: 'DDA', lastUpdatedAt: '22 Mar 2024', nextUpdateAt: '10 Sept 2024', link: '/report/north' },
    ];

    return (
        <div className="w-full">
            <main className="bg-white">
                <div className='breadcrumb p-10 text-white px-20'>
                    <h1 className="text-3xl font-bold mb-4">East</h1>
                    <p className='text-sm'>Home/ East</p>
                </div>

                <div className="space-y-4 p-20">
                    <ul>
                        {districts.map((district, index) => (
                            <li
                                key={index}
                                className={`flex justify-between items-center p-3 ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <div>
                                    <p className='font-bold text-sm'>{district.name}</p>
                                    <p className='text-sm flex justify-center items-center'>
                                        <span>Last Updated : {district.lastUpdatedAt}</span>
                                        <span className='ml-10'>Next Update : {district.nextUpdateAt}</span>
                                    </p>
                                </div>
                                <Button variant={'outline'}>
                                    <Link href={district.link}>
                                        View
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>

            </main>
        </div>
    );
};

export default Page;
