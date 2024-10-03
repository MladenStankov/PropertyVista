import React, { useEffect, useRef } from 'react'
import styles from '../styles/Search.module.css'

interface IProps {
    onClickHandler: () => void
}

const Search: React.FC<IProps> = ({onClickHandler}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            onClickHandler()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div className={styles['overlay']}>
            <div ref={wrapperRef} className={styles['wrapper']}>
                <a>asASDAsdasdasdasdasds</a>
            </div>
        </div>
    )
}

export default Search