import './Header.css'

const Header = () =>{

    return (
        <>
        <div className = "head-text">
          <div className="Slogen-placeholder">
            <img src={require('../../assets/bg.jpg')} alt="background" />
          </div>
          <div className='text-on-image'>
            <h1>Remotivate</h1> 
            <p> This is just a student's trying out react.</p>
          </div>
        </div>
        <div className='header-container'>
            <div className='front-page-header-bottom'>
            <ul className='front-page-header-list'>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-list-text'>Enhance data analytics</div>
                </li>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-list-text'>Lorem ipsum</div>
                </li>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-list-text'>Lorem ipsum</div>
                </li >
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-list-text'>Lorem ipsum</div>
                </li>
            </ul>
            <ul className='front-page-header-list'>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-descr1'>Implement efficient analytics to accelerate your time to insights and respond to changing business environment.</div>
                </li>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-descr2'>Validate business concepts and provide competitive services by analyzing and anticipating customer behavior.</div>
                </li>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-descr3'>Unlock rich audience insights that will help you react to any business changes as quickly as possible.</div>
                </li>
                <li className='front-page-header-list-container'>
                    <div className='front-page-header-descr4'>Automate data tasks and ensure flawless data management processes.</div>
                </li>
            </ul>
            </div>
        </div>
        </>
    )
}

export default Header