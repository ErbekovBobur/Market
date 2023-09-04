import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { ReactComponent as UsdLogo } from '../../img/us1.svg';
import { ReactComponent as EurLogo } from '../../img/eu.svg';
import { ReactComponent as RuLogo } from '../../img/ru.svg';
import { ReactComponent as UpLogo } from '../../img/up.svg';
import { ReactComponent as DownLogo } from '../../img/down.svg';
import { ReactComponent as ZeroLogo } from '../../img/zero.svg';
import style from '../../style/weather.module.css'

function Weather() {
    const [current, setCurrent] = useState({});
    const [forecast, setForecast] = useState();
    const [currency, setCurrency] = useState();

    function getWeek(date) {
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let num = new Date(date).getDay();
        return days[num]
    }

    async function getWeather() {
        await axios
            .get('https://api.weatherapi.com/v1/forecast.json?key=0bd05913b38c4c488d5171943221512&q=Tashkent&days=10&aqi=no&alerts=no')
            .then(({ data }) => {
                setForecast(data.forecast.forecastday);
                setCurrent({ ...data.current });
            })
            .catch((er) => console.log(er));
        await axios
            // .get('https://api.currencyapi.com/v3/latest?apikey=cur_live_lNzYGrZgmkE9OiJg15u2l21GoIq8LAbDgQErflSc&currencies=EUR%2CUSD%2CCAD&base_currency=UZS')
            .get('https://cbu.uz/ru/arkhiv-kursov-valyut/json/')
            .then(({ data }) => {
                setCurrency(data);
            })
            .catch(err => console.log(err))
    };
    useEffect(() => {
        getWeather();
    }, []);
    return (
        <Container fluid className='rounded border border-light bg-white'>
            <Suspense fallback='<h5>Loading...</h5'>
                <Row sm className='aling-items-center bg-light text-dark m-1'>
                    <Col sm md={7} lg={8} xxxl={9}>
                        <Row className='justify-content-sm-evenly'>
                            <Col sm md={6} lg={5} className='align-items-center'>
                                {current && <Row xs className='h-100 justify-content-center'>
                                    <Col className='fs-4 align-self-center text-center'>
                                        Toshkent
                                    </Col>
                                    <Col className='d-flex align-items-center'>
                                        {current.hasOwnProperty("condition") && <Image src={current.condition.icon} rounded
                                        />}
                                    </Col>
                                    <Col className='fs-5 align-self-center p-0'>
                                        {current.temp_c} °C
                                    </Col>
                                </Row>}
                            </Col>
                            <Col sm md={6} lg={7} className='d-none d-md-block'>
                                <Row md className='justify-content-center'>
                                    {forecast && forecast.map((item, index) =>
                                        <Col xs={4} key={index} className={[index % 2 === 0 ? 'bg-light bg-gradient border' : 'border border-white', 'text-center']}>
                                            <Row className='align-items-center'>
                                                <Col
                                                // md={6}
                                                >
                                                    {getWeek(item.date)}
                                                </Col>
                                                <Col
                                                    // md={6}
                                                    className='p-0 m-0'>
                                                    <Image src={item.day.condition.icon}
                                                        fluid
                                                    // className='h-75'
                                                    // lg={{ transform: "scale(1.1)" }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row  >
                                                <Col xs className={style.tempText}>{Math.floor(item.day.maxtemp_c)} °C</Col>
                                                <Col xs className={style.tempText}>{Math.floor(item.day.mintemp_c)} °C</Col>
                                            </Row>
                                        </Col>)
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={5} lg={4} xxxl={3} className='d-flex py-0 d-none d-md-block'>
                        {currency &&
                            <Col xs className='d-flex flex-column p-0 justify-content-around flex-grow-1'>
                                <Row xs>
                                    <Col xs={2} className={style.currencyLogoWrapper}>
                                        <UsdLogo className={style.currencyLogo} />
                                    </Col>
                                    <Col xs={6} className='fs-6'>
                                        <strong>{currency[0].Ccy}</strong> = {currency[0].Rate}
                                    </Col>
                                    <Col xa={2} className={currency[0].Diff > 0 ? 'text-success p-0' : ' text-danger p-0'}>
                                        {currency[0].Diff}
                                    </Col>
                                    <Col xs={2} className='p-0'>
                                        {currency[0].Diff > 0 ? <UpLogo /> : <DownLogo /> || <ZeroLogo />}
                                    </Col>
                                </Row>
                                <Row xs>
                                    <Col xs={2} className={style.currencyLogoWrapper}>
                                        <EurLogo className={style.currencyLogo} />
                                    </Col>
                                    <Col xs={6} className='fs-6'>
                                        <strong>{currency[1].Ccy}</strong> = {currency[1].Rate}
                                    </Col>
                                    <Col xs={2} className={currency[1].Diff > 0 ? 'text-success p-0' : ' text-danger p-0'}>
                                        {currency[1].Diff}
                                    </Col>
                                    <Col xs={2} className='p-0'>
                                        {currency[1].Diff > 0 ? <UpLogo /> : <DownLogo /> || <ZeroLogo />}
                                    </Col>
                                </Row>
                                <Row xs>
                                    <Col xs={2} className={((style.currencyLogoWrapper))}>
                                        <RuLogo className={style.currencyLogo} />
                                    </Col>
                                    <Col xs={6}>
                                        <strong>{currency[2].Ccy}</strong> = {currency[2].Rate}
                                    </Col>
                                    <Col xa={2} className={currency[2].Diff > 0 ? 'text-success p-0' : ' text-danger p-0'}>
                                        {currency[2].Diff}
                                    </Col>
                                    <Col xs={2} className='p-0'>
                                        {currency[2].Diff > 0 ? <UpLogo /> : <DownLogo /> || <ZeroLogo />}

                                    </Col>
                                </Row>
                            </Col>
                        }
                    </Col>
                </Row>
            </Suspense>
        </Container >
    )
}

export default Weather