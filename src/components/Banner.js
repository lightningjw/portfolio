import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/portrait.JPG";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Justin Wong", "a Computer Science Student", "a Sports Enthusiast", "a World Traveler" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                {/* <span className="tagline">Welcome to my Portfolio</span> */}
                <h1>{`I'm `}<span className="txt-rotate, highlight" dataPeriod="1000" data-rotate='[ "Justin Wong", "a Computer Science Student", "a Sports Enthusiast", "a World Traveler" ]'><span className="wrap">{text}</span></span></h1>
                  <p className="intro">I am an undergraduate student at the University of Michigan’s College of Engineering pursuing a degree in Computer Science. 
                    As a member of the Engineering Global Leadership Honors Program, I am expanding my global perspective through the International Minor for Engineering. 
                    This program allowed me to study abroad in Dublin, Ireland, and volunteer on the Blackfeet Indian Reservation in Montana. 
                    I am is also planning to gain business acumen through coursework in the Ross Business School and my Tauber Institute project. 
                    My passion for technology stems from my first phone, which inspires me to make the world a more interconnected place. 
                    I have gained valuable experience through my work analyzing player churn for a mobile gaming start-up and creating a website for my high school’s newspaper. 
                    These experiences instilled in me the importance of stakeholder engagement in an agile project development environment. 
                    I am a collaborative team member, having worked on projects through the University of Michigan's Robotic Submarine Project Team as well as an industry-sponsored MDP project with IPAVE. 
                    I am a strong believer in the profound impact that interdisciplinary teams can have in tackling the world’s most challenging problems. 
                    When I'm not busy coding, I enjoy playing intramural sports and supporting my favorite Bay Area teams.</p>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
