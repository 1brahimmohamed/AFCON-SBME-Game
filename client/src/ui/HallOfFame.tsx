const people = [
    {
        name: 'Mohamed Mostafa',
        role: 'FIFA WC 2022 Winner 🏆',
        imageUrl: '/hof/mostafa.jpg',
    },
    {
        name: 'Abdelrahman Yaser',
        role: 'FIFA WC 2022 Runner-Up 🥈',
        imageUrl: '/hof/body.jpg',
    },
    {
        name: 'Mohamed Salman',
        role: 'FIFA WC 2022 3rd Place 🥉',
        imageUrl: '/hof/ava.webp',
    },
    {
        name: 'Ahmed Gamal',
        role: 'AFCON 2023 Winner 🏆',
        imageUrl: '/hof/ava.webp',
    },
    {
        name: 'Mariam Turky',
        role: 'AFCON 2023 Runner-Up 🥈',
        imageUrl: '/hof/turk.jpg',
    },
    {
        name: 'Abram Gad',
        role: 'AFCON 2023 3rd Place 🥉',
        imageUrl: '/hof/abram.jpg',
    },
    {
        name: 'Hesham Tamer',
        role: 'EURO 2024 Winner 🏆',
        imageUrl: '/hof/hesham.jpg',
    },
    {
        name: 'Yehia Said',
        role: 'EURO 2024 Runner-Up 🥈',
        imageUrl: '/hof/yehia.jpg',
    },
    {
        name: 'Omar Adel',
        role: 'EURO 2024 3rd Place 🥉',
        imageUrl: '/hof/ava.webp',
    },


]

const HallOfFame = () => {
    return (
        <div className="bg-white py-10 sm:py-10 mb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">SBME Prediction Hall of Fame</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        حيتان التوقعات
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {people.map((person) => (
                        <li key={person.name}>
                            <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.imageUrl} alt=""/>
                            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                            <p className="text-base leading-7 text-gray-600">{person.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default HallOfFame;
