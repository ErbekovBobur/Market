import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function CategoryItem({ item, func }) {
    const [isEditCategory, setIsEditCategory] = useState(true);
    const [inputValue, setInputValue] = useState(item.item.name);

    function showDate(date) {
        return new Date(date).toLocaleDateString();
    };

    return (
        <>
            <tr className='text-center align-middle'>
                <td>{item.index + 1}</td>
                <td>
                    {!isEditCategory ? (<Form.Control value={inputValue} onChange={(e) => setInputValue(e.target.value)} id='name' size="sm" />) :
                        (item.item.name)
                    }
                </td>
                <td>
                    {showDate(item.item.date)}
                </td>
                <td>
                    <Button
                        size='sm'
                        onClick={(e) => {
                            setIsEditCategory(!isEditCategory)
                            !isEditCategory && func(e, { inputValue, id: item.item.id })
                        }}
                    >
                        {isEditCategory ? 'Edit' : 'OK'}
                    </Button>
                </td>
                <td >
                    <Button disabled={!isEditCategory} variant='danger' size='sm' onClick={e => func(e, item.item.id)}>
                        Удалить
                    </Button>
                </td>
            </tr >
        </>
    )
}
export default CategoryItem;