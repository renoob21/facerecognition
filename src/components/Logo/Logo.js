import React from 'react';
import Tilt from 'react-parallax-tilt'
import brain from './Logo.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='dib ma3 mt0'>
            <Tilt className='Tilt br2 shadow-2 pa3 f2'>
                <div>
                    <img style={{paddingTop:'5px'}} src={brain} alt="Logo" height={'50px'} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;