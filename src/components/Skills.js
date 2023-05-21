import pythonicon from "../assets/img/pythonicon.svg";
import cplusplusicon from "../assets/img/cplusplusicon.png";
import htmlicon from "../assets/img/htmlicon.svg";
import cssicon from "../assets/img/cssicon.png";
import javaicon from "../assets/img/javaicon.png";
import javascripticon from "../assets/img/javascripticon.png";
import sqlicon from "../assets/img/sqlicon.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img className="item-image" src={cplusplusicon} alt="Image" />
                                <h5>C++</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={pythonicon} alt="Image" />
                                <h5>Python</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={htmlicon} alt="Image" />
                                <h5>HTML</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={cssicon} alt="Image" />
                                <h5>CSS</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={javaicon} alt="Image" />
                                <h5>Java</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={javascripticon} alt="Image" />
                                <h5>JavaScript</h5>
                            </div>
                            <div className="item">
                                <img className="item-image" src={sqlicon} alt="Image" />
                                <h5>SQL</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
