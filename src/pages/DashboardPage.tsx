const HomePage = () => {
    return (
        <div className={`flex flex-col gap-x-2`}>
            <h1 className={`text-3xl font-bold text-left my-2 mb-6`}>Analytics</h1>

            <div className="flex w-full">
                {/* Left-side filter panel */}
                <div className="min-w-1/4 flex-grow mr-2">
                    {/*  TODO: sidebar will go here  */}
                </div>

                {/* Right-side charts and metrics */}
                <div className="w-full">
                    {/*  Content goes here  */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
