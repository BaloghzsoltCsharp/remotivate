import './LandingPage.css';
import Navbar from "./Navbar";
import Header from "./Header";

const LadingPage = () => {

    return(
        <div className="landing-page-container">
                <Navbar/>
                <Header/>
                <section className="services-section">
                <div className='section-inner'>
                    <h3 className="services-title">How Remotivate Can Boost Your Performance</h3>
                    <div className='service-slogen'>Streamline your remote work with Remotivate</div>
                    <ul className='services-list'>
                        <li className='services-list-item'>
                            <div className='services-list-container'>
                                <div className='services-list-title'>Lorem ipsum ipsum lorem</div>
                                <div className='services-list-description'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis.</div>
                                <div ><span className='service-more'>Learn More...</span></div>
                            </div>
                        </li>
    
                        <li className='services-list-item'>
                            <div className='services-list-container'>
                                <div className='services-list-title'>Lorem ipsum ipsum lorem</div>
                                <div className='services-list-description'>Lorem ipsum dolor sit amet, consectetur adipisci elit, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate.</div>
                                <div ><span className='service-more'>Learn More...</span></div>
                            </div>
                        </li>
    
                        <li className='services-list-item'>
                            <div className='services-list-container'>
                                <div className='services-list-title'>Lorem ipsum ipsum lorem</div>
                                <div className='services-list-description'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum </div>
                                <div ><span className='service-more'>Learn More...</span></div>
                            </div>
                        </li>
    
                        <li className='services-list-item'>
                            <div className='services-list-container'>
                                <div className='services-list-title'>Lorem ipsum ipsum lorem</div>
                                <div className='services-list-description'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</div>
                                <div ><span className='service-more'>Learn More...</span></div>
                            </div>
                        </li>
    
                        <li className='services-list-item'>
                            <div className='services-list-container'>
                                <div className='services-list-title'>Lorem ipsum ipsum lorem</div>
                                <div className='services-list-description'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis.</div>
                                <div ><span className='service-more'>Learn More...</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <p>We welcome opportunities to work alongside different teams on projects of any complexity. Working together, we will help you to put yourself ahead of your competition.</p>
                <div className='service-button-container'>
                    <button className="services-button">I Am Interested In</button>
                </div>
            </section>
        </div>
    )
}

export default LadingPage