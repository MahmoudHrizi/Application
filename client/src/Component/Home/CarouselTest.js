import React from 'react'
import { Button ,Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import home1 from '../../img/carousel0.jpg'
import home2 from '../../img/home.jpg'
import home3 from '../../img/carousel1.jpg'
const CarouselTest = () => {
    return (
      
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={home1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={home2}
            alt="Third slide"
          />
      
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={home3}
            alt="Third slide"
          />
      
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     
    )
}

export default CarouselTest
