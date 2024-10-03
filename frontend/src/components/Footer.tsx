import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles['wrapper']}>
      <a href='/'>Back to home</a>
      <div className={styles['contact']}>
        <p>Contact us</p>
      </div>
    </div>
  )
}

export default Footer