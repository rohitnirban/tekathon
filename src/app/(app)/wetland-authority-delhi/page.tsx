'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    const districts = [
        { name: 'East', link: '/report/east' },
        { name: 'West', link: '/report/west' },
        { name: 'North', link: '/report/north' },
        { name: 'South', link: '/report/south' },
        { name: 'Central', link: '/report/central' },
        { name: 'North-East', link: '/report/north-east' },
        { name: 'North-West', link: '/report/north-west' },
        { name: 'South-East', link: '/report/south-east' },
        { name: 'South-West', link: '/report/south-west' },
        { name: 'New Delhi', link: '/report/new-delhi' },
        // Add more districts with their corresponding links here
    ];

    return (
        <div className="w-full">
            <main className="bg-white">
                <div className='breadcrumb p-10 text-white px-20'>
                    <h1 className="text-3xl font-bold mb-4">District Wise/ Agency Wise List</h1>
                    <p className='text-sm'>Home/ District Wise/ Agency Wise List</p>
                </div>

                <div className="space-y-4 p-20">
                    <ul>
                        {districts.map((district, index) => (
                            <li
                                key={index}
                                className={`flex justify-between items-center p-3 ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <p className='font-bold text-sm'>{district.name}</p>
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
