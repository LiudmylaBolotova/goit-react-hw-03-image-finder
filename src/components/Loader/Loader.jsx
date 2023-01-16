import { Circles } from 'react-loader-spinner';
import style from '../Loader/Loader.module.css';

export const Loader = () => {
    return (
      <Circles
        height="100"
        width="100"
        color="blue"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass={style.loader}
        visible={true}
      />
    );
}
