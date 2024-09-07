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
        value: '1,450',
        change: '+2.5% from last month',
        icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Monitored Water Bodies',
        value: '150',
        change: '+1.3% from last month',
        icon: <Monitor className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Under Maintenance',
        value: '1',
        change: '+3.1% from last month',
        icon: <Settings className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'High Pollution Areas',
        value: '42',
        change: '+0.2% from last month',
        icon: <Cloud className="h-4 w-4 text-muted-foreground" />
    },
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
    imageLink: string;
};

type District = {
    name: string;
    lastUpdatedAt: string;
    nextUpdateAt: string;
    details: Detail[];
};

const districts: District[] = [
    {
        name: 'BDO',
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
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 2,
                wetlandName: 'Mayur Vihar Pond',
                coordinates: '77°18\'45.22"E 28°36\'12.35"N',
                district: 'East',
                village: 'Mayur Vihar',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 0.5,
                khasraNo: '(e)582(1-02)',
                regulatedWetland: 'Yes',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
            {
                serialNo: 3,
                wetlandName: 'Trilokpuri Marsh',
                coordinates: '77°18\'10.33"E 28°36\'45.89"N',
                district: 'East',
                village: 'Trilokpuri',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 0.75,
                khasraNo: '(f)723(1-15)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 4,
                wetlandName: 'Mandawali Swamp',
                coordinates: '77°18\'30.45"E 28°37\'22.11"N',
                district: 'East',
                village: 'Mandawali',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 0.3,
                khasraNo: '(g)845(0-18)',
                regulatedWetland: 'Yes',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            },
            {
                serialNo: 5,
                wetlandName: 'Kalyanpuri Reservoir',
                coordinates: '77°19\'05.67"E 28°37\'40.23"N',
                district: 'East',
                village: 'Kalyanpuri',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 1.2,
                khasraNo: '(h)967(2-05)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
            {
                serialNo: 6,
                wetlandName: 'Kondli Wetland',
                coordinates: '77°19\'55.89"E 28°37\'18.34"N',
                district: 'East',
                village: 'Kondli',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 0.9,
                khasraNo: '(i)1089(1-22)',
                regulatedWetland: 'Yes',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            },
            {
                serialNo: 7,
                wetlandName: 'Patparganj Lake',
                coordinates: '77°17\'40.12"E 28°37\'55.78"N',
                district: 'East',
                village: 'Patparganj',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 2.5,
                khasraNo: '(j)1211(5-00)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 8,
                wetlandName: 'Preet Vihar Pond',
                coordinates: '77°18\'22.56"E 28°38\'30.91"N',
                district: 'East',
                village: 'Preet Vihar',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 0.4,
                khasraNo: '(k)1333(0-32)',
                regulatedWetland: 'Yes',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
        ],
    },
    {
        name: 'DDA',
        lastUpdatedAt: '19 Apr 2024',
        nextUpdateAt: '9 Sept 2024',
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
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 2,
                wetlandName: 'Sanjay Lake',
                coordinates: '28° 36\' 36.000" N 77° 18\' 0.000" E',
                district: 'East',
                village: 'Trilokpuri',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 17.0,
                khasraNo: '(b)789, 012 (30-5)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 3,
                wetlandName: 'Nizamuddin Wetland',
                coordinates: '28° 35\' 24.000" N 77° 15\' 0.000" E',
                district: 'South East',
                village: 'Nizamuddin',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 2.5,
                khasraNo: '(c)345, 678 (5-10)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
            {
                serialNo: 4,
                wetlandName: 'Vasant Kunj Wetland',
                coordinates: '28° 31\' 12.000" N 77° 9\' 36.000" E',
                district: 'South West',
                village: 'Vasant Kunj',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 3.2,
                khasraNo: '(d)901, 234 (7-5)',
                regulatedWetland: 'Yes',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            },
            {
                serialNo: 5,
                wetlandName: 'Dwarka Sector 23 Lake',
                coordinates: '28° 33\' 0.000" N 77° 3\' 36.000" E',
                district: 'South West',
                village: 'Dwarka',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 5.5,
                khasraNo: '(e)567, 890 (12-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 6,
                wetlandName: 'Rohini Sector 15 Pond',
                coordinates: '28° 43\' 48.000" N 77° 7\' 12.000" E',
                district: 'North West',
                village: 'Rohini',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 1.8,
                khasraNo: '(f)123, 456 (4-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
            {
                serialNo: 7,
                wetlandName: 'Narela Wetland',
                coordinates: '28° 51\' 0.000" N 77° 6\' 0.000" E',
                district: 'North',
                village: 'Narela',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 4.0,
                khasraNo: '(g)789, 012 (9-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 8,
                wetlandName: 'Mayur Vihar Phase I Pond',
                coordinates: '28° 36\' 36.000" N 77° 17\' 24.000" E',
                district: 'East',
                village: 'Mayur Vihar',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 0.7,
                khasraNo: '(h)345, 678 (1-14)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
        ],
    },
    {
        name: 'MCD',
        lastUpdatedAt: '02 Apr 2024',
        nextUpdateAt: '04 Sept 2024',
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
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 2,
                wetlandName: 'Hauz Khas Lake',
                coordinates: '28° 32\' 45.00" N 77° 12\' 0.00" E',
                district: 'South',
                village: 'Hauz Khas',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 6.0,
                khasraNo: '(c)234, 567 (15-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
            {
                serialNo: 3,
                wetlandName: 'Bhalswa Lake',
                coordinates: '28° 44\' 15.00" N 77° 10\' 0.00" E',
                district: 'North West',
                village: 'Bhalswa',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Natural',
                areaInHa: 35.0,
                khasraNo: '(d)890, 123 (40-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
            {
                serialNo: 4,
                wetlandName: 'Najafgarh Jheel',
                coordinates: '28° 36\' 30.00" N 76° 59\' 0.00" E',
                district: 'South West',
                village: 'Najafgarh',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Natural',
                areaInHa: 200.0,
                khasraNo: '(e)456, 789 (150-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 5,
                wetlandName: 'Sanjay Van Lake',
                coordinates: '28° 31\' 45.00" N 77° 9\' 0.00" E',
                district: 'South',
                village: 'Mehrauli',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 8.5,
                khasraNo: '(f)012, 345 (20-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            },
            {
                serialNo: 6,
                wetlandName: 'Prasad Nagar Lake',
                coordinates: '28° 38\' 30.00" N 77° 11\' 15.00" E',
                district: 'Central',
                village: 'Prasad Nagar',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 1.2,
                khasraNo: '(g)678, 901 (3-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
            {
                serialNo: 7,
                wetlandName: 'Smriti Van Lake',
                coordinates: '28° 41\' 0.00" N 77° 7\' 30.00" E',
                district: 'North West',
                village: 'Pitampura',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 3.8,
                khasraNo: '(h)234, 567 (9-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 8,
                wetlandName: 'Ashok Vihar Lake',
                coordinates: '28° 41\' 45.00" N 77° 10\' 30.00" E',
                district: 'North West',
                village: 'Ashok Vihar',
                wetlandType: 'Lacustrine',
                wetlandSubType: 'Artificial',
                areaInHa: 2.5,
                khasraNo: '(i)890, 123 (6-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            },
        ],
    }
];

type DistrictDialogProps = {
    district: District;
};

const DistrictDialog: React.FC<DistrictDialogProps> = ({ district }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'outline'}>View</Button>
        </DialogTrigger>
        <DialogContent className='w-[80vw] max-w-none max-h-[80vh] overflow-auto'>
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
                <h1 className="text-3xl font-bold mb-4">Central</h1>
                <p className='text-sm'>Home/ Report/ Central</p>
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
