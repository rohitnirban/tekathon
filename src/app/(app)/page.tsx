'use client'

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
import React, { useState } from 'react';

const cardData = [
    {
        title: 'Total Water Bodies',
        value: '3,450',
        change: '+8.5% from last month',
        icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Monitored Water Bodies',
        value: '1,250',
        change: '+15.3% from last month',
        icon: <Monitor className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Under Maintenance',
        value: '12',
        change: '+10% from last month',
        icon: <Settings className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'High Pollution Areas',
        value: '432',
        change: '+5.2% from last month',
        icon: <Cloud className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Potential Diseases',
        value: '175',
        change: '+3.7% from last month',
        icon: <Activity className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Wildlife Sightings',
        value: '68',
        change: '+7.4% from last month',
        icon: <Leaf className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Near Agricultural Land',
        value: '89',
        change: '+2.1% from last month',
        icon: <Briefcase className="h-4 w-4 text-muted-foreground" />
    },
    {
        title: 'Total Funding',
        value: '₹340,000',
        change: '+12% from last month',
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
    }
];

const Page = () => {

    return (
        <div className="w-full">
            <main className="bg-white">
                <div className="space-y-4 pt-10 px-4 md:px-20">
                    <h1 className="text-3xl font-bold mb-4">Monitored Data</h1>
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {cardData.slice(4).map((card, index) => (
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
                                <Overview />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;
