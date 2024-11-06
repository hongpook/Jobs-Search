import Carousel from 'react-bootstrap/Carousel';
import Slide_1 from '../assets/images/slider-image-1-1920x700.jpg';
import Slide_2 from '../assets/images/slider-image-2-1920x700.jpg';
import Slide_3 from '../assets/images/slider-image-3-1920x700.jpg';

function CaroudelSide() {
  return (
    <Carousel slide={true}>
      <Carousel.Item>
        <img src={Slide_1}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Slide_2}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Slide_3}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CaroudelSide;