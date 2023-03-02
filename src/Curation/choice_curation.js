import axios from "axios";
import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { NavLink } from "react-router-dom";
import TmdbdiscoverUrl from "../commonApi_tmdb/tmdbDiscoverUrl";
import TmdbPerson from "../commonApi_tmdb/tmdbPeople";
import TMDB_KEY from "../commonApi_tmdb/tmdb_key";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { baseUrl } from "../commonApi_tmdb/baseUrl";

const ChoiceCuration = (props) => {
  const { choiceCuration } = props;
  // const { pyCuration } = props;

  const choice = {
    user: choiceCuration.user,
    movie: choiceCuration.curationMovie,
    genre: choiceCuration.curationGenre,
    director: choiceCuration.curationDirector,
    cast: choiceCuration.curationCast,
  };

  const [pyCuration, setPyCuration] = useState({
    user: "",
    pyMoviecode: "",
    pyMovietitle: "",
    pyMovieposter: "",
  });

  // const pychoice = {
  //   user: pyCuration.user,
  //   pyMoviecode: pyCuration.pyMoviecode,
  //   pyMovietitle: pyCuration.pyMovietitle,
  //   pyMovieposter: pyCuration.pyMovieposter,
  // };

  const [genreList, setGenreList] = useState([]); // 장르 정보
  const [directorInfo, setDirectorInfo] = useState([]); // 감독 정보
  const [castInfo, setCastInfo] = useState([]); // 배우 정보

  // Tmdb API
  const lang = "&language=ko";
  const popular = "&sort_by=popularity.desc";
  const region = "&region=kr";
  const adult = "&include_adult=false";
  const genre_id = "&with_genres=";
  const v_count = "&vote_count.gte=100";
  const page = "&page=1";

  // 장르 인기순
  const getPopList = async () => {
    await axios
      .get(
        TmdbdiscoverUrl +
          "?api_key=" +
          TMDB_KEY +
          lang +
          region +
          popular +
          adult +
          page +
          genre_id +
          choice.genre.genrecode +
          v_count
      )
      .then((response) => {
        setGenreList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //////////////////////////////////////////////////////

  // 감독 정보
  const getDirector = async () => {
    if (choice.director.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            choice.director.personcode +
            "/movie_credits?api_key=" +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setDirectorInfo(response.data.cast);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  ///////////////////////////////////////////////////////

  // 배우 정보
  const getCast = async () => {
    if (choice.cast.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            choice.cast.personcode +
            "/movie_credits?api_key=" +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setCastInfo(response.data.cast);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  //////////////////////////////////////////////////////

  const data = new FormData();
  data.append("usercode", localStorage.getItem("usercode"));

  const getPyCuration = async () => {
    await axios
      .post(baseUrl + "/curationmovie", data)
      .then((response) => {
        console.log(response.data);
        setPyCuration({
          user: response.data.usercode,
          pyMoviecode: response.data.moviecode,
          pyMovietitle: response.data.pyMovietitle,
          pyMovieposter: response.data.poster_url,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPopList();
    getDirector();
    getCast();
    getPyCuration();
  }, [choiceCuration]);

  const settings = {
    dots: false, // 캐러셀의 점을 보여줄 것 인지
    infinite: true, // 마지막장 다음에 첫장이 나오게 할 지
    speed: 500, // 다음 컨텐츠 까지의 속도
    autoplay: true, // 자동으로 재생할지
    arrows: true, // 좌,우 버튼
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    slidesToShow: 5, // 한 화면에 몇개의 사진을 동시에 보여줄지
    slidesToScroll: 1,
    draggable: true, // 드래그
  };

  return (
    <>
      <div className='basic_curation_wrap'>
        {typeof choice.user === "string" ? (
          <>
            <br />
            <br />
            <br />
            <div className='curation_explain'>
              지금 {choice.user}성들이 보는 영화.
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* 성별 베스트 영화 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}성</span>
                  들이 가장 선호하는 영화는?
                </span>
              </div>
              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {choice.movie &&
                    choice.movie.map((choice, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {choice.poster_url === null ||
                            choice.poster_url === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  choice.poster_url
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${choice.moviecode}`}
                            style={{ textDecoration: "none" }}>
                            <div
                              className='basic_curation_title'
                              style={{ width: "100%" }}>
                              {choice.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <hr />

            {/* 성별 선호 장르 */}

            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}성</span>
                  들이 가장 선호하는 장르는{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {choice.genre.name}
                  </span>
                  <span>!</span>
                </span>
              </div>

              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {genreList &&
                    genreList.map((genre, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {genre.poster_path === null ||
                            genre.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  genre.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${genre.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {genre.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>

              <div className='basic_curation_btn'>
                <NavLink
                  to={`/genre/pop/${choice.genre.genrecode}`}
                  key={choice.genre.genrecode}
                  value={choice.genre.genrecode}>
                  <button className='basic_curation_plus_btn'>+</button>
                </NavLink>
              </div>
            </div>
            <hr />
            {/* 성별 선호 감독 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}성</span>
                  들이 가장 선호하는 감독은{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {choice.director.name}
                  </span>
                  <span>!</span>
                </span>
              </div>

              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {directorInfo &&
                    directorInfo.map((director, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {director.poster_path === null ||
                            director.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  director.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${director.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {director.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <hr />

            {/* 성별 선호 배우 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}성</span>
                  들이 가장 선호하는 배우는{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {choice.cast.name}
                  </span>
                  <span>!</span>
                </span>
              </div>
              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {castInfo &&
                    castInfo.map((cast, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {cast.poster_path === null ||
                            cast.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  cast.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${cast.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {cast.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 연령별 베스트 영화 */}
            <br />
            <br />
            <br />
            <div className='curation_explain'>
              지금 {choice.user}대들이 보는 영화.
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}대</span>
                  들의 마음을 사로잡은 영화는?
                </span>
              </div>
              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {choice.movie &&
                    choice.movie.map((choice, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {choice.poster_url === null ||
                            choice.poster_url === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  choice.poster_url
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${choice.moviecode}`}
                            style={{ textDecoration: "none" }}>
                            <div
                              className='basic_curation_title'
                              style={{ width: "100%" }}>
                              {choice.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <hr />

            {/* 연령별 선호 장르 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}대</span>
                  들의 마음을 사로잡은 장르는 바로{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {choice.genre.name}
                  </span>
                  <span>!</span>
                </span>
              </div>

              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {genreList &&
                    genreList.map((genre, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {genre.poster_path === null ||
                            genre.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  genre.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${genre.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {genre.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>

              <div className='basic_curation_btn'>
                <NavLink
                  to={`/genre/pop/${choice.genre.genrecode}`}
                  key={choice.genre.genrecode}
                  value={choice.genre.genrecode}>
                  <button className='basic_curation_plus_btn'>+</button>
                </NavLink>
              </div>
            </div>
            <hr />

            {/* 연령별 선호 감독 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}대</span>
                  의 마음을 사로잡은 감독,
                  <span style={{ fontWeight: "bolder" }}>
                    {" "}
                    {choice.director.name}
                  </span>
                  <span>의 작품을 만나보세요!</span>
                </span>
              </div>
              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {directorInfo &&
                    directorInfo.map((director, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {director.poster_path === null ||
                            director.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  director.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${director.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {director.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <hr />

            {/* 연령별 선호 배우 */}
            <div className='basic_curation_component'>
              <div className='basic_curation_subject'>
                <br />
                <span>
                  <span style={{ fontWeight: "bolder" }}>{choice.user}대</span>
                  의 마음을 사로잡은 배우,
                  <span style={{ fontWeight: "bolder" }}>
                    {" "}
                    {choice.cast.name}
                  </span>
                  <span>의 작품을 만나보세요!</span>
                </span>
              </div>

              <div className='basic_curation_slide'>
                <Slider {...settings}>
                  {castInfo &&
                    castInfo.map((cast, idx) => {
                      return (
                        <div className='basic_curation_info' key={idx}>
                          <div>
                            {cast.poster_path === null ||
                            cast.poster_path === undefined ? (
                              <img
                                className='basic_curation_img'
                                src='/images/none_img.jpg'
                              />
                            ) : (
                              <img
                                className='basic_curation_img'
                                src={
                                  "https://image.tmdb.org/t/p/w500" +
                                  cast.poster_path
                                }
                              />
                            )}
                          </div>
                          <NavLink
                            to={`/detail/${cast.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className='basic_curation_title'>
                              {cast.title}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChoiceCuration;
