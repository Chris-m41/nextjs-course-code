import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);
    // useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
    const {data, error} = useSWR('https://nextjs-course-f3c70-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        console.log('error', error)
        const transformSales = [];
        if (data) {
            console.log('data', data)
            for (const key in data) {
                transformSales.push({
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume
                })
            }
            setSales(transformSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load</p>
    }

    if(!data && !sales) {
        <p>Loading...</p>
    }


    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-course-f3c70-default-rtdb.firebaseio.com/sales.json')
    //     .then(res => {
    //         return res.json();
    //     }).then(data => {
    //         console.log('data', data)
    //         const transformSales = [];
    //         for (const key in data) {
    //             transformSales.push({
    //                 id: key, 
    //                 username: data[key].username, 
    //                 volume: data[key].volume
    //             })
    //         }
    //         setSales(transformSales);
    //         setIsLoading(false);
    //     });
    // }, [])

    // if (isLoading) {
    //     return (
    //         <p>Loading...</p>
    //     )
    // }

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>{sale.username} = ${sale.volume}</li>)}
        </ul>
    )
}

export async function getStaticProps() {
    return fetch('https://nextjs-course-f3c70-default-rtdb.firebaseio.com/sales.json')
        .then(res => {
            return res.json();
        }).then(data => {
            const transformSales = [];
            for (const key in data) {
                transformSales.push({
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume
                })
            }
            return {props: {
                sales: transformSales,
            }, revalidate: 10};
        });
}

export default LastSalesPage;