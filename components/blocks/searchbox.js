import styles from '/styles/SearchBox.module.css'
import Image from 'next/image'

function SearchBox({}){
    return(
        <input className={styles.SearchBox} type="text" placeholder="Поиск" />
    )
}

export default SearchBox;