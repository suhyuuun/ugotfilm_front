import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
//import { useNavigate } from "react-router-dom";
import './login.css';

const LoginPage = () => {
  //const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${baseUrl}/login`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('response:', response.data);
        console.log(response);

        //let jwtToken = response.headers['authorization'];
        let jwtToken = response.headers.get('authorization');
        console.log(jwtToken);

        let jwtUsername = response.data.username;
        let jwtAuthRole = response.data.authRole;
        let jwtUsercode = response.data.usercode;
        let jwtNickname = response.data.nickname;
        console.log('jwtToken', jwtToken);
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('username', jwtUsername);
        localStorage.setItem('authRole', jwtAuthRole);
        localStorage.setItem('usercode', jwtUsercode);
        localStorage.setItem('nickname', jwtNickname);
        setUsername('');
        setPassword('');
      })
      .then((response) => {
        // navigate("/");
        window.location.replace('/');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className='join_form_wrap'>
      {/* 왼쪽: 회원가입 */}
      <div className='existing_user_login_box'>
        <div className='join_form_title'>
          <div style={{ fontSize: '15px', padding: '30px 0 30px 0' }}>
            <span style={{ color: 'black' }}>U</span>{' '}
            <span style={{ color: 'black' }}>G</span>OT{' '}
            <span style={{ color: 'black' }}>F</span>ILM
          </div>
          <div>
            <div className='logo_text'>
              <span style={{ color: 'black' }}>우</span>연을
              <div>
                <span style={{ color: 'black' }}>가</span>장한
              </div>
              <div>
                <span style={{ color: 'black' }}>필</span>연
              </div>
            </div>
          </div>
        </div>
        <img className='join_form_img' src='/images/join_image.gif' />
        <div className='existing_user_login_text'>
          <span>
            회원이 아니라면
            <button className='existing_user_login_btn'>
              <Link
                className='existing_user_login_text'
                to='/join'
                style={{ textDecoration: 'none' }}
              >
                <span className='go_existing_login'>회원가입</span>
              </Link>
            </button>
          </span>
          <span className='existing_user_login_text'>해주세요.</span>
        </div>
      </div>

      {/* 오른쪽: 로그인 */}
      <div className='join_form_container'>
        <form onSubmit={onSubmit}>
          <div className='join_form_title' style={{ margin: '150px 0 50px 0' }}>
            LOGIN.
          </div>
          <div className='form-group mt-1'>
            <input
              type='text'
              name='username'
              className='form-control join_form_input'
              id='username'
              placeholder='USERNAME'
              maxLength='20'
              onChange={handleUsernameChange}
            />
          </div>
          <div className='form-group mt-1'>
            <input
              type='password'
              className='form-control join_form_input'
              name='password'
              id='password'
              placeholder='PASSWORD'
              maxLength='20'
              onChange={handlePasswordChange}
            />
          </div>
          <div className='login_btn_box' style={{ marginTop: '50px' }}>
            <button type='submit' className='btn btn-primary'>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
