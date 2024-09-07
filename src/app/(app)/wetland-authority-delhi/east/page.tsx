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
        value: '428',
        change: '+3.5% from last month',
        icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Monitored Water Bodies',
        value: '50',
        change: '+15.3% from last month',
        icon: <Monitor className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Under Maintenance',
        value: '3',
        change: '+2.20% from last month',
        icon: <Settings className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'High Pollution Areas',
        value: '42',
        change: '+1.2% from last month',
        icon: <Cloud className="h-4 w-4 text-muted-foreground" />
    }
];

type Detail = {
    serialNo: number;
    wetlandName: string;
    coordinates: string;
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
        lastUpdatedAt: '15 July 2024',
        nextUpdateAt: '05 Aug 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Ghazipur F/74(4)',
                coordinates: '77°19\'14.17"E 28°38\'6.18"N',
                village: 'Ghazipur',
                wetlandType: 'Inland',
                wetlandSubType: 'Natural',
                areaInHa: 0.00113,
                khasraNo: '(d)464(0-09)',
                regulatedWetland: 'Yes',
                imageLink: 'https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-ekke5q34alfi0a3470r2srvu61-20180805011122.Medi.jpeg'
            },
            {
                serialNo: 2,
                wetlandName: 'Ghazipur F/75(5)',
                coordinates: '77°19\'14.20"E 28°38\'6.20"N',
                village: 'Ghazipur',
                wetlandType: 'Inland',
                wetlandSubType: 'Artificial',
                areaInHa: 0.00114,
                khasraNo: '(d)465(0-10)',
                regulatedWetland: 'No',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
            {
                serialNo: 3,
                wetlandName: 'Ghazipur Pond A',
                coordinates: '77°19\'13.18"E 28°38\'5.19"N',
                village: 'Ghazipur',
                wetlandType: 'Pond',
                wetlandSubType: 'Natural',
                areaInHa: 0.00230,
                khasraNo: '(d)466(0-11)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            },
            {
                serialNo: 4,
                wetlandName: 'Ghazipur Lake',
                coordinates: '77°19\'15.17"E 28°38\'7.18"N',
                village: 'Ghazipur',
                wetlandType: 'Lake',
                wetlandSubType: 'Artificial',
                areaInHa: 1.5,
                khasraNo: '(d)467(0-12)',
                regulatedWetland: 'No',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            }
        ],
    },
    {
        name: 'DDA',
        lastUpdatedAt: '02 Aug 2024',
        nextUpdateAt: '15 Aug 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Yamuna Floodplain',
                coordinates: '28° 37\' 47.439" N 77° 18\' 45.070" E',
                village: 'Yamuna Bank',
                wetlandType: 'Riverine',
                wetlandSubType: 'Natural',
                areaInHa: 50.0,
                khasraNo: '(a)123, 456 (45-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://media.assettype.com/TNIE/import/2023/7/1/original/Najafgarh.jpg'
            },
            {
                serialNo: 2,
                wetlandName: 'Yamuna Wetland A',
                coordinates: '28° 36\' 35.00" N 77° 17\' 50.00" E',
                village: 'Yamuna Village',
                wetlandType: 'Riverine',
                wetlandSubType: 'Artificial',
                areaInHa: 40.0,
                khasraNo: '(b)101, 789 (35-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            }
        ]
    },
    {
        name: 'MCD',
        lastUpdatedAt: '18 Aug 2024',
        nextUpdateAt: '20 Aug 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'Forest Area A',
                coordinates: '28° 36\' 35.00" N 77° 17\' 50.00" E',
                village: 'Forest Village',
                wetlandType: 'Forest',
                wetlandSubType: 'Natural',
                areaInHa: 100.0,
                khasraNo: '(b)789, 101 (55-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://indianexpress.com/wp-content/uploads/2016/05/yamuna.jpg'
            },
            {
                serialNo: 2,
                wetlandName: 'North Forest Wetland',
                coordinates: '28° 35\' 30.00" N 77° 16\' 40.00" E',
                village: 'Forest Area',
                wetlandType: 'Forest',
                wetlandSubType: 'Natural',
                areaInHa: 80.0,
                khasraNo: '(c)555, 789 (45-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://www.theweekendleader.com/admin/upload/30_11_2021_10_46_42_delhi-wet-land.jpg'
            }
        ]
    },
    {
        name: 'DJB',
        lastUpdatedAt: '25 July 2024',
        nextUpdateAt: '30 Aug 2024',
        details: [
            {
                serialNo: 1,
                wetlandName: 'SDMC Wetland A',
                coordinates: '28° 39\' 40.00" N 77° 19\' 30.00" E',
                village: 'SDMC Area',
                wetlandType: 'Urban',
                wetlandSubType: 'Artificial',
                areaInHa: 20.0,
                khasraNo: '(c)456, 789 (20-0)',
                regulatedWetland: 'Yes',
                imageLink: 'https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-ekke5q34alfi0a3470r2srvu61-20180805011122.Medi.jpeg'
            },
            {
                serialNo: 2,
                wetlandName: 'SDMC Pond',
                coordinates: '28° 40\' 50.00" N 77° 21\' 40.00" E',
                village: 'SDMC Village',
                wetlandType: 'Pond',
                wetlandSubType: 'Natural',
                areaInHa: 25.0,
                khasraNo: '(d)654, 789 (25-0)',
                regulatedWetland: 'No',
                imageLink: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1480505912-yamuna926-getty.jpg'
            }
        ]
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
                <h1 className="text-3xl font-bold mb-4">East</h1>
                <p className='text-sm'>Home/ Report/ East</p>
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
