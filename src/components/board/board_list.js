import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import TableRow from './table_row';
import axios from 'axios';
import PageNavigation from './page_nav';
import './board.css';

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [pv, setPv] = useState({ currentPage: 1 });
  const { currentPage } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getList(currentPage ? currentPage : 1);
  }, []);

  const getList = async (currentPage) => {
    console.log('currentPage:' + currentPage);
    await axios.get(baseUrl + '/board/list/' + currentPage).then((response) => {
      console.log(response.data);
      setBoardList(response.data.aList);
      setPv(response.data.pv);
    });
  };

  const handle = (e) => {
    navigator('/');
  };

  return (
    <div className='board_list_wrap'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='notice_board'>
        <img className='notice_board_img' src='/images/notice.png' />
        <div className='notice_board_title'>공지 게시판</div>
      </div>
      <div className='notice_board_btn_box'>
        <Link className='notice_board_btn btn btn-danger' to='/board/write'>
          글쓰기
        </Link>
        <button className='notice_board_btn btn btn-danger' onClick={handle}>
          홈으로
        </button>
      </div>

      <table className='table table_row_wrap'>
        <colgroup>
          <col width='8%' />
          <col width='*' />
          <col width='12%' />
          <col width='12%' />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardList &&
            boardList.map((board) => {
              return (
                <TableRow
                  board={board}
                  currentPage={pv.currentPage}
                  key={board.num}
                />
              );
            })}
        </tbody>
      </table>
      {pv ? (
        <PageNavigation
          currentPage={pv.currentPage}
          startPage={pv.startPage}
          endPage={pv.endPage}
          blockPage={pv.blockPage}
          totalPage={pv.totalPage}
          getList={getList}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default BoardList;
