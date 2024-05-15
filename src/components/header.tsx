import React from 'react';

const Header: React.FC = () => {
    return (
        <div>
            <header className="bg-black text-white flex h-20 items-center justify-around">
                <h1>Exploitation</h1>
                <ul className='flex'>
                    <li>
                        <a href="/modules" className=''>Vos modules</a>
                    </li>
                    <li>
                        <a href="/login" className='ml-20'>Se connecter</a>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Header;
