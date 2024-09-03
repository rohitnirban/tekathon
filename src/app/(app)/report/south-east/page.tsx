'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import Link from 'next/link';

type Detail = {
    serialNo: number;
    wetlandName: string;
    coordinates: string;
    district: string;
    village: string;
    wetlandType: string;
    wetlandSubType: string;
    areaInHa: number;
    khasraNo: string;
    regulatedWetland: string;
    landOwnership: string;
};

type District = {
    name: string;
    lastUpdatedAt: string;
    nextUpdateAt: string;
    details: Detail[];
};

const districts: District[] = [
    {
        name: 'ASI',
        lastUpdatedAt: '22 Mar 2024',
        nextUpdateAt: '10 Sept 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Ghazipur F/74(4)',
                coordinates: '77°19\'14.17"E 28°38\'6.18"N',
                district: 'East',
                village: 'Ghazipur',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 0.00113,
                khasraNo: '(d)464(0-09)',
                regulatedWetland: 'Yes',
                landOwnership: 'ASI',
            },
        ],
    },
    {
        name: 'DDA',
        lastUpdatedAt: '22 Mar 2024',
        nextUpdateAt: '10 Sept 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Yamuna Floodplain',
                coordinates: '28° 37\' 47.439" N 77° 18\' 45.070" E',
                district: 'East',
                village: 'Yamuna Bank',
                wetlandType: 'Riverine',
                wetlandSubType: 'Natural',
                areaInHa: 50.0,
                khasraNo: '(a)123, 456 (45-0)',
                regulatedWetland: 'Yes',
                landOwnership: 'DDA',
            },
        ],
    },
    {
        name: 'Forest',
        lastUpdatedAt: '22 Mar 2024',
        nextUpdateAt: '10 Sept 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Forest Area A',
                coordinates: '28° 36\' 35.00" N 77° 17\' 50.00" E',
                district: 'North',
                village: 'Forest Village',
                wetlandType: 'Forest',
                wetlandSubType: 'Natural',
                areaInHa: 100.0,
                khasraNo: '(b)789, 101 (55-0)',
                regulatedWetland: 'Yes',
                landOwnership: 'Forest Department',
            },
        ],
    },
    {
        name: 'SDMC',
        lastUpdatedAt: '22 Mar 2024',
        nextUpdateAt: '10 Sept 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'SDMC Wetland A',
                coordinates: '28° 39\' 40.00" N 77° 19\' 30.00" E',
                district: 'North',
                village: 'SDMC Area',
                wetlandType: 'Urban',
                wetlandSubType: 'Artificial',
                areaInHa: 20.0,
                khasraNo: '(c)456, 789 (20-0)',
                regulatedWetland: 'Yes',
                landOwnership: 'SDMC',
            },
        ],
    },
];

type DistrictDialogProps = {
    district: District;
};

const DistrictDialog: React.FC<DistrictDialogProps> = ({ district }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'outline'}>View</Button>
        </DialogTrigger>
        <DialogContent className='w-[80vw] max-w-none'>
            <DialogHeader>
                <DialogTitle>{district.name} Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S. No.</TableHead>
                            <TableHead>Wetland Name</TableHead>
                            <TableHead>Geographical Coordinates</TableHead>
                            <TableHead>District(s)</TableHead>
                            <TableHead>Village</TableHead>
                            <TableHead>Wetlands Type</TableHead>
                            <TableHead>Wetlands Sub-Type</TableHead>
                            <TableHead>Area in (ha)</TableHead>
                            <TableHead>Khasra No./Areas</TableHead>
                            <TableHead>Whether falls within category of regulated wetlands</TableHead>
                            <TableHead>Land ownerships</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {district.details.map((detail) => (
                            <TableRow key={detail.serialNo}>
                                <TableCell>{detail.serialNo}</TableCell>
                                <TableCell>{detail.wetlandName}</TableCell>
                                <TableCell>{detail.coordinates}</TableCell>
                                <TableCell>{detail.district}</TableCell>
                                <TableCell>{detail.village}</TableCell>
                                <TableCell>{detail.wetlandType}</TableCell>
                                <TableCell>{detail.wetlandSubType}</TableCell>
                                <TableCell>{detail.areaInHa}</TableCell>
                                <TableCell>{detail.khasraNo}</TableCell>
                                <TableCell>{detail.regulatedWetland}</TableCell>
                                <TableCell>{detail.landOwnership}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    </Dialog>
);

const Page = () => (
    <div className="w-full">
        <main className="bg-white">
            <div className='breadcrumb p-10 text-white px-20'>
                <h1 className="text-3xl font-bold mb-4">Districts</h1>
                <p className='text-sm'>Home/ Districts</p>
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
                            <DistrictDialog district={district} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    </div>
);

export default Page;
