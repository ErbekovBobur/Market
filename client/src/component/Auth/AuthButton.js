import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { checkUserState, logoutUser } from '../../services/slices/auth';
import { checkSaveFavoriteList, emptyFavoriteList } from '../../services/slices/productsSlice';

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.loggedIn);

    function handleLogin() {
        if (!isLogin) {
            navigate('/login');
        } else {
            dispatch(logoutUser());
            dispatch(emptyFavoriteList());
            dispatch(checkSaveFavoriteList());
            navigate('/');
        }
    };
    useEffect(() => {
        dispatch(checkUserState());
    })

    return (
        <>
            <Button size='sm' variant="outline-info" onClick={handleLogin}>
                {!isLogin ? 'Login' : 'Logout'}
            </Button>
        </>
    );
}

export default Auth