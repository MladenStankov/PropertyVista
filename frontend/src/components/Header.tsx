import styles from '../styles/Header.module.css'
import logo from '../public/logo_horizontal.svg'
import {CiSearch} from 'react-icons/ci'
import { useState } from 'react'
import Search from './Search'


const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const onClickHandler = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
        <div className={styles['wrapper']}>
            <a href='/'>
                <img className={styles['logo']} src={logo}/>
            </a>

            <div className={styles['navigation']}>
                <ul>
                    <li><a href='/properties'>Properties</a></li>
                    <li><a href='/map'>Map</a></li>
                </ul>
                
                <div className={styles['cta']}>
                    <div className={styles['search']} onClick={onClickHandler}>
                        <CiSearch className={styles['icon']} /> 
                    </div>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>

        {isVisible && <Search onClickHandler={onClickHandler}/>}
        </>
        
      )
}

export default Header