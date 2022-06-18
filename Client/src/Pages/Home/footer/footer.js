import React from 'react'
import './footer.css'
import facebook from '../../../images/facebook.png'
import instagram from '../../../images/instagram.png'
import logs from '../../../images/logs.png'
const Footer = () => {

    return (
        <div className='footerBackground'>
            <div className='footerBlock'>
                <h2>Contact Us</h2>
                <div className='socialLinks'>
                    <img src={facebook} style={{ width: '50px' }} alt='facebook '/>
                    <img src={logs} style={{width: '50px'}}/>
                    <img src={instagram} style={{ width: '50px' }} alt='instagram '/>
                </div>
            </div>
        </div>
    )
}

export default Footer