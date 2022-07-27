import React from 'react'
import '../Css/Home.css'
import Box from './Box'
import Title from './Title'

const Home = () => {
    return (
        <>
            <div className='home-container row'></div>
            <div className='home-info row'>
                <Title texto='TÍTULO' className='home-title' />
                <div className='home-text'>
                    <p>Lorem ipsum vehicula ultrices fusce aenean sagittis aliquet sodales erat egestas, porttitor nostra aenean nisl eros quis maecenas id cras blandit phasellus, taciti enim ac sit sagittis velit porttitor erat mollis. litora mauris tempor velit purus pellentesque torquent nam, et etiam fermentum primis consectetur etiam faucibus, potenti congue vehicula arcu a mattis. aliquet ut commodo varius molestie at suspendisse vestibulum tempor mi per dui at, massa accumsan tortor per habitant curabitur consectetur et quisque phasellus dapibus, mi etiam sed quam a tortor porta mattis augue arcu fermentum. euismod senectus ut sapien sociosqu fringilla rutrum neque velit habitasse, in mollis ac at primis volutpat fringilla augue donec ligula, donec blandit taciti nisl class commodo adipiscing erat. </p>
                </div>
            </div>

            <div className='home-box row'>
                <Box />
            </div>
        </>
    )
}

export default Home