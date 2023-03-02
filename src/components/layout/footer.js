import { Link } from 'react-router-dom';
import './layout.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <span style={{ fontWeight: 'bolder' }}>제작자 </span>
        <span>임호진, 김수현, 박정민, 이준혁, 엄지찬, 최인찬</span>
      </div>
      <Link to='board' style={{ textDecoration: 'none' }}>
        공지사항
      </Link>
      <div style={{ fontWeight: 'bolder' }}>Copyright ⓒ U Got Film</div>
    </div>
  );
};

export default Footer;
