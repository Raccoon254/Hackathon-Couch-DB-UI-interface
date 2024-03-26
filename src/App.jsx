import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./Home.jsx";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/medic')
            .then(response => response.json())
            .then(data => {
                const groupedItems = data.reduce((acc, item) => {
                    const numKeys = Object.keys(item).filter(key => key !== '_id' && key !== '_rev').length; // Exclude _id and _rev from count
                    if (!acc[numKeys]) {
                        acc[numKeys] = [];
                    }
                    acc[numKeys].push(item);
                    return acc;
                }, {});
                setData(groupedItems);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!data) {
        return (
            <div className="w-full h-full flex items-center justify-center mx-auto p-4">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    const ItemsWithKeyValuePairs = ({ numKeys, data }) => {
        const uniqueKeys = new Set();
        data.forEach(item => Object.keys(item).forEach(key => {
            if (key !== '_id' && key !== '_rev') { // Ignore _id and _rev keys
                uniqueKeys.add(key);
            }
        }));

        return (
            <div className="mt-10 w-full overflow-x-scroll">
                <h3 className="text-xl font-bold mb-2">Items with {numKeys} key-value pairs</h3>
                <table className="w-full border-collapse mb-4">
                    <thead>
                    <tr className="bg-gray-200 text-gray-900">
                        {Array.from(uniqueKeys).map(key => (
                            <th key={key} className="py-2 px-4 border">
                                {key}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="odd:bg-gray-800">
                            {Array.from(uniqueKeys).map(key => (
                                <td key={`${index}-${key}`} className="py-2 px-4 border">
                                    {item[key] !== undefined ? (
                                        typeof item[key] === 'object' ? (
                                            <pre>{JSON.stringify(item[key], null, 2)}</pre>
                                        ) : (
                                            item[key]
                                        )
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <Router>
            <div className={'flex flex-col items-start justify-start'}>
                <nav className={'w-full top-0 flex justify-start sticky bg-gray-800 bg-opacity-90 text-white overflow-x-scroll'}>
                    <ul className={'flex w-full bg-gray-200 bg-opacity-10 h-14 items-center p-4 justify-center gap-4'}>
                        {Object.keys(data).map((numKeys) => (
                            <li key={numKeys}>
                                <Link to={`/items-with-${numKeys}-key-value-pairs`}>
                                    {numKeys} key-value pairs
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
                <Routes>
                    {Object.keys(data).map((numKeys) => (
                        <Route
                            key={numKeys}
                            path={`/items-with-${numKeys}-key-value-pairs`}
                            element={<ItemsWithKeyValuePairs numKeys={numKeys} data={data[numKeys]}/>}
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
