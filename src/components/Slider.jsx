import React, { useState, useRef, useEffect } from 'react';
import { Carousel, Button, Progress } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import ItemSlide from './ItemSlide';
import '../styles/index.css'
import { GoComment } from 'react-icons/go';

const Slider = () => {
    
    const carouselRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(1);
    const [data, setData] = useState([])

    const prev = () => {
        carouselRef.current.prev();
        setCurrentSlide(currentSlide - 1);
    };

    const next = () => {
        carouselRef.current.next();
        setCurrentSlide(currentSlide + 1);
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments?_limit=4')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='slider-container'>
            {/* Top */}
            <div className='top'>
                <div className='title'>Отзывы пользователей</div>
                <div className='comment'>
                    <GoComment color='#0071CE'/>
                    <span className='comment-text'>Оставить отзыв</span>
                </div>
            </div>

            {/* Middle */}
            <Carousel
                ref={carouselRef}
                afterChange={(current) => setCurrentSlide(current + 1)}
                className='carousel'>
                {data.map((item, i) => (
                    <ItemSlide
                        key={i}
                        name={item.name}
                        email={item.email}
                        body={item.body}
                    />
                ))}
            </Carousel>

            {/* Bottom */}
            <div className="bottom">
                <Progress
                    className="progressBar"
                    size={'small'}
                    percent={(currentSlide * 100) / 4}
                    showInfo={false}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#108ee9',
                    }}
                />
                <Button
                    className="prevButton"
                    type="link"
                    size="large"
                    onClick={prev}
                    disabled={currentSlide === 1}>
                    <LeftOutlined />
                </Button>
                <div className='counter'>
                    <div className='current-slide'>{currentSlide}</div>
                    <div className='divider'>/</div>
                    <div className='total-slides'>{data.length}</div>
                </div>
                <Button
                    className="nextButton"
                    type="link"
                    size="large"
                    onClick={next}
                    disabled={currentSlide === 4}>
                    <RightOutlined />
                </Button>
            </div>
        </div>
    );
};

export default Slider;
