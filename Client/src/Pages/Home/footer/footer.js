import React from 'react'
import './footer.css'
import facebook from '../../../images/facebook.png'
import instagram from '../../../images/instagram.png'

const Footer = () => {

    return (
        <div className='footerBackground'>
            <div className='footerBlock'>
                <h2>Contact Us</h2>
                <div className='socialLinks'>
                    <img src={facebook} style={{ width: '100px' }} alt='facebook '/>
                </div>
                <div className='socialLinks'>
                    <img src={instagram} style={{ width: '100px' }} alt='instagram '/>
                </div>
            </div>
        </div>
    )
}

export default Footer