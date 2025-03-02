import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/sidebar';
import Header from '@/Components/header';
import withAuth from '@/hoc/withAuth';

function Exchange() {
    const router = useRouter();
    const [selectedExchange, setSelectedExchange] = useState('');

    // Hardcoded exchange data
    const exchanges = [
        {
            _id: '1',
            exchangeName: 'Binance',
            imageUrl: '/Assets/bybit.jpg',
            description: 'World’s largest crypto exchange.',
            status: true,
        },
        {
            _id: '2',
            exchangeName: 'Coinbase',
            imageUrl: '/Assets/bybit.jpg',
            description: 'Buy and sell crypto instantly.',
            status: true,
        },
        {
            _id: '3',
            exchangeName: 'Kraken',
            imageUrl: '/Assets/bybit.jpg',
            description: 'Secure cryptocurrency trading.',
            status: false,
        },
    ];

    const handleExchangeSelect = (value) => {
        const selected = exchanges.find(ex => ex.exchangeName === value);
        if (selected && selected.status) {
            setSelectedExchange(value);
        }
    };

    const handleSave = () => {
        if (selectedExchange) {
            router.push('/page/ApiConfiguration');
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">

                <Header />
                <div className="w-full h-screen flex items-center justify-center bg-black">
                    <div className="flex flex-col items-center justify-center">
                        <div className="shadow-lg rounded-lg w-full max-w-[1200px] p-10 mt-4 mb-12 bg-black">
                            <p className="text-2xl font-bold text-white text-center mb-8 mt-12">Select Exchange</p>

                            <div className="mt-6 flex flex-wrap justify-center gap-8">
                                {exchanges.map(exchange => (
                                    <div
                                        key={exchange._id}
                                        onClick={() => handleExchangeSelect(exchange.exchangeName)}
                                        className={`relative flex flex-col items-center justify-center cursor-pointer p-6 rounded-lg ${selectedExchange === exchange.exchangeName ? 'border-4 border-blue-600' : 'border border-blue-800'
                                            } transition-all duration-300 transform ${exchange.status ? 'hover:bg-blue-950 hover:scale-105' : ''
                                            } bg-black text-white`}
                                        style={{ width: '240px', height: '240px' }}
                                    >
                                        <img src={exchange.imageUrl} alt={`${exchange.exchangeName} Logo`} className="w-24 h-24 mb-4 rounded-full" />
                                        <span className="font-semibold text-lg">{exchange.exchangeName}</span>
                                        <p className="text-gray-400 text-center mt-2">{exchange.description}</p>

                                        {!exchange.status && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg">
                                                <div className="px-3 py-1 text-xs font-medium text-center text-blue-400 bg-blue-900 rounded-full animate-pulse">Inactive</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={handleSave}
                                    className="text-lg font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-700 py-4 w-1/2 transition-all duration-300"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Exchange);
