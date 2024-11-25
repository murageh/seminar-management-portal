import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../components/base/Button.tsx';
import {IMAGES} from "../assets/images.ts";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            {/* Div with centered image with some padding */}
            <div className="w-1/5 p-4">
                <img src={IMAGES.ConnectionError} alt="404" className="w-full h-auto"/>
            </div>
            <p className="text-lg text-gray-600 mb-8">
                You might have lost your way. Let's get you back on track.
            </p>
            <Button onClick={() => navigate('/dashboard')} variant="primary">
                Go back to the dashboard
            </Button>
        </div>
    );
};

export default NotFoundPage;