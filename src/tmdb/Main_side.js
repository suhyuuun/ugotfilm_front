import { Link } from 'react-router-dom';
// import { Link } from 'react-scroll/modules';
// 를 써야된다고 알고 있는데 react-scroll/modules를 쓰면 아예 link조차 안 걸림

const MainSide = () => {
  return (
    <div className='MainSideDiv'>
      <div style={{ listStyleType: 'none' }}>
        {/* 전체 회원 취향 */}
        <div className='main_side_btn_subject'>
          <Link
            to='whole_user'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span className='main_side_btn_subject_txt'>
              - 전체 회원의 선호 취향 -
            </span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='whole_movie'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <img className='main_side_btn_img' src='/images/2movie.png' />
            <span className='main_side_btn_title'>MOVIE</span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='whole_actor'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <img className='main_side_btn_img' src='/images/2genre.png' />
            <span className='main_side_btn_title'>GENRE</span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='whole_director'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <img className='main_side_btn_img' src='/images/2actors.png' />
            <span className='main_side_btn_title'>ACTOR</span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='whole_genre'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <img className='main_side_btn_img' src='/images/2director.png' />
            <span className='main_side_btn_title'>DIRECTOR</span>
          </Link>
        </div>

        {/* 개인 회원 취향 */}
        <div className='main_side_btn_subject'>
          <Link
            to='one_user'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span className='main_side_btn_subject_txt'>
              - <span>정민</span>님의 선호 취향 -
            </span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='one_user_movie'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span>
              <img className='main_side_btn_img' src='/images/2movie.png' />
              <span className='main_side_btn_title'>MOVIE</span>
            </span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='one_user_actor'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span>
              <img className='main_side_btn_img' src='/images/2genre.png' />
              <span className='main_side_btn_title'>GENRE</span>
            </span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='one_user_director'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span>
              <img className='main_side_btn_img' src='/images/2actors.png' />
              <span className='main_side_btn_title'>ACTOR</span>
            </span>
          </Link>
        </div>
        <div className='main_side_btn'>
          <Link
            to='one_user_genre'
            smooth={true}
            duration={50}
            style={{ textDecoration: 'none' }}
          >
            <span>
              <img className='main_side_btn_img' src='/images/2director.png' />
              <span className='main_side_btn_title'>DIRECTOR</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainSide;
