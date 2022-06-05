import styles from '/styles/VioletTextBox.module.css'

function VioletTextBox({placeholder, children}){
    return(
        <textarea className={styles.textarea} placeholder = {placeholder}>{children}</textarea>
    )
}
export default VioletTextBox;