import style from 'components/Button/Button.module.css';

export const Button = ({ onClick }) => {
  return  (
    <button onClick={onClick} className={style.button}>Load more</button>
)
     
}