import styles from '/styles/VioletTextBox.module.css'

function VioletTextBox({placeholder}){
    return(
        <textarea className={styles.textarea} placeholder = {placeholder}/>
    )
}
export default VioletTextBox;