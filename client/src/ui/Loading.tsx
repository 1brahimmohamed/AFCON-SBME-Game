import { MutatingDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className={'h-[80vh] w-full flex justify-center items-center'}>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#000d40"
                secondaryColor="#66bdce"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loading;
