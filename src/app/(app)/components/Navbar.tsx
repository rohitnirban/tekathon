'use client'

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import useSticky from '@/hooks/useSticky';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const menuItems = [
    { title: 'Home', href: '/' },
    {
        title: 'About Us',
        href: '/about',
        submenu: [
            { title: 'Overview', href: '/about/overview' },
            { title: 'Mission', href: '/about/mission' },
            { title: 'Team', href: '/about/team' },
        ],
    },
    {
        title: 'Informations',
        href: '/informations',
        submenu: [
            { title: 'Trees', href: '/informations/trees' },
            { title: 'Clean Delhi Drive', href: '/informations/clean-delhi-drive' },
            {
                title: 'World Top 10', href: '/informations/world-top-10s', submenu: [
                    { title: 'Overview', href: '/about/overview' },
                    { title: 'Mission', href: '/about/mission' },
                    { title: 'Team', href: '/about/team' },
                ],
            },
            { title: 'Meet The State Bird', href: '/informations/state-bird' },
            { title: 'Point 16', href: '/informations/point-16' },
            {
                title: 'Newspaper Clippings', href: '/informations/newspaper-clippings', submenu: [
                    { title: 'Overview', href: '/about/overview' },
                    { title: 'Mission', href: '/about/mission' },
                    { title: 'Team', href: '/about/team' },
                ],
            },
        ],
    },
    { title: 'Miscellaneous', href: '/miscellaneous' },
    { title: 'Wetland Authority of Delhi', href: '/wetland-authority' },
    { title: 'Notice Board', href: '/notice-board' },
    { title: 'Downloads', href: '/downloads' },
    { title: 'Media', href: '/media' },
    { title: 'RTI', href: '/rti' },
    { title: 'Contact Us', href: '/contact' },
];

const Navbar = () => {

    const isSticky = useSticky(150);


    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (path: string) => {
        setOpenMenus(prev =>
            prev.includes(path) ? prev.filter(item => item !== path) : [...prev, path]
        );
    };

    const isMenuOpen = (path: string) => openMenus.includes(path);

    const renderMenu = (items: any[], parentPath: string = '') => (
        <ul className="absolute bg-[#115589] mt-2 p-2 shadow-lg z-10">
            {items.map((item) => {
                const currentPath = `${parentPath}/${item.title}`;
                return (
                    <li key={item.title} className="relative group">
                        {item.submenu ? (
                            <div>
                                <button
                                    onClick={() => toggleMenu(currentPath)}
                                    className="flex items-center hover:text-yellow-300 focus:outline-none"
                                >
                                    {item.title}
                                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isMenuOpen(currentPath) ? 'rotate-180' : ''}`} />
                                </button>
                                {isMenuOpen(currentPath) && (
                                    <div className="relative">
                                        {renderMenu(item.submenu, currentPath)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={item.href}>
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuSeparator /> */}
                                <span className="block py-1 px-2 hover:bg-blue-700 whitespace-nowrap text-left">{item.title}</span>
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <header className="bg-blue-900 text-white">
            <div className='px-20 flex justify-end items-center'>
                <button className='py-1 px-3 bg-yellow-500 text-black font-bold'>Login</button>
                <p className='ml-2 text-md'>
                    English
                </p>
            </div>
            <div className='bg-white flex justify-between items-center px-20 py-4'>
                <div className="left flex justify-center items-center">
                    <img src="https://dpgs.delhi.gov.in/sites/default/files/logo/emblem-dark-logo_0_7.png" alt="National Emblem" />
                    <span className='text-black flex flex-col justify-center font-bold ml-4'>
                        <span className='text-xl'>Delhi Parks and Gardens Society</span>
                        <span>Government of NCT of Delhi</span>
                    </span>
                </div>
                <div className="right flex justify-center items-center">
                    <img src="https://dpgs.delhi.gov.in/sites/default/files/PAO/header-sublogos/lok-sabha-election1.jpg" alt="lok sabha election" width={100} />
                    <img src="https://dpgs.delhi.gov.in/sites/default/files/header-sublogos/india-flag-1.jpg" alt="india flag" width={100} />
                    <img src="https://dpgs.delhi.gov.in/sites/default/files/header-sublogos/amrit-mahotsav.jpg" alt="amrit mahotsav" width={100} />
                </div>
            </div>
            <nav className={`px-14 bg-[#084c9d] text-white transition-all ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}`}>
                <ul className="flex justify-evenly items-center flex-wrap space-x-4">
                    {menuItems.map((item) => (
                        <li key={item.title} className="relative group hover:bg-[#005fa8] p-2">
                            {item.submenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleMenu(item.title)}
                                        className="flex items-center  focus:outline-none"
                                    >
                                        {item.title}
                                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isMenuOpen(item.title) ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isMenuOpen(item.title) && (
                                        <div className="relative">
                                            {renderMenu(item.submenu, item.title)}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href={item.href}>
                                    <span className="">{item.title}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar