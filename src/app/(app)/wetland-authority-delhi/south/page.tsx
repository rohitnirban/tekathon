'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import Link from 'next/link';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart2,
    Monitor,
    Settings,
    Cloud,
    Activity,
    Leaf,
    DollarSign,
    Briefcase
} from 'lucide-react';
import { MultiBar } from '../../components/MutiBar';

const cardData = [
    {
        title: 'Total Water Bodies',
        value: '829',
        change: '+2.3% from last month',
        icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Monitored Water Bodies',
        value: '343',
        change: '+3.3% from last month',
        icon: <Monitor className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Under Maintenance',
        value: '0',
        change: '+0% from last month',
        icon: <Settings className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'High Pollution Areas',
        value: '119',
        change: '+7.9% from last month',
        icon: <Cloud className="h-4 w-4 text-muted-foreground" />
    }
];

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
    imageLink:string;
};

type District = {
    name: string;
    lastUpdatedAt: string;
    nextUpdateAt: string;
    details: Detail[];
};

const districts: District[] = [
    {
        name: 'NTPC',
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
                imageLink:'https://res.cloudinary.com/duqeanwph/image/upload/v1725467192/ph9dhzxlibrsxibsfks5.png'
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
                imageLink:'https://res.cloudinary.com/duqeanwph/image/upload/v1725467192/ph9dhzxlibrsxibsfks5.png'
            },
        ],
    },
    {
        name: 'South Forest Div',
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
                imageLink:'https://res.cloudinary.com/duqeanwph/image/upload/v1725467192/ph9dhzxlibrsxibsfks5.png'
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
                            <TableHead>Recent Image</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {district.details.map((detail) => (
                            <TableRow key={detail.serialNo}>
                                <TableCell>{detail.serialNo}</TableCell>
                                <TableCell>{detail.wetlandName}</TableCell>
                                <TableCell>
                                    <Link href={`https://www.google.com/maps/place/${detail.coordinates}`} target='_blank'>
                                        {detail.coordinates}
                                    </Link>
                                </TableCell>
                                <TableCell>{detail.district}</TableCell>
                                <TableCell>{detail.village}</TableCell>
                                <TableCell>{detail.wetlandType}</TableCell>
                                <TableCell>{detail.wetlandSubType}</TableCell>
                                <TableCell>{detail.areaInHa}</TableCell>
                                <TableCell>{detail.khasraNo}</TableCell>
                                <TableCell>{detail.regulatedWetland}</TableCell>
                                <TableCell>{detail.landOwnership}</TableCell>
                                <TableCell>
                                    <Link href={detail.imageLink} target='_blank' className='text-blue-700 underline'>
                                        Link
                                    </Link></TableCell>
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
                <h1 className="text-3xl font-bold mb-4">South</h1>
                <p className='text-sm'>Home/ Report/ South</p>
            </div>

            <div className="space-y-4 pt-10 px-4 md:px-20">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cardData.slice(0, 4).map((card, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {card.title}
                                </CardTitle>
                                {card.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {card.change}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div>
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-3">
                            <MultiBar />
                        </CardContent>
                    </Card>
                </div>
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
