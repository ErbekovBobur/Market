import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useGetCategoryQuery, useGetProductQuery } from '../services/api/productApi';
import { useDispatch } from 'react-redux';
import { viewByCategory } from '../services/slices/productsSlice';


function ProductsByCategory() {
    const { data, isError, isLoading } = useGetProductQuery();
    const category = useGetCategoryQuery();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);


    async function getProductByCategory(e) {
        e.preventDefault();
        try {
            if (e.target.textContent !== 'Все товары') {
                setProducts(data.filter((item) => item.category === e.target.textContent));
            } else {
                dispatch(viewByCategory(''));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=>{
        dispatch(viewByCategory(products));
    },[products]);

    return (
        <>
            <DropdownButton size='sm' variant='outline-info' menuVariant='dark' id="dropdown-item-button" title="Категории" >
                <Dropdown.Item as="button" onClick={(e) => getProductByCategory(e)}>Все товары</Dropdown.Item>
                {category.data && category.data.map((item, index) =>
                    <Dropdown.Item as="button" key={index} onClick={(e) => getProductByCategory(e)}>
                        {item.name}
                    </Dropdown.Item>
                )}
            </DropdownButton>
        </>
    )
}

export default ProductsByCategory