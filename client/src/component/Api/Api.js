import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Api() {
    const [apis, setApis] = useState([]);
    async function getApi() {
        const { data } = await axios('https://api.publicapis.org/entries')
        setApis(data.entries)
    }
    useEffect(() => {
        getApi();
        console.log(apis);
    }, [])
    return (
        <div>
            
            <ol>
                {
                    apis.map((elem, index) =>
                        <li
                            key={index}
                        >
                            <p>
                                {elem.api}
                                <span>{elem.Category}</span>
                            </p>
                            <p>
                                {elem.Description}
                            </p>
                            <a href={elem.Link}>
                                {elem.Link}
                            </a>

                        </li>
                    )
                }
            </ol>
        </div>
    )
}

export default Api