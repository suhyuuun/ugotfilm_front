import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../commonApi_tmdb/baseUrl";

const PasswordModify = () => {
  const navigator = useNavigate();
  //비밀번호 수정
  const [inputs, setInputs] = useState({
    password: "",
    passwordConfirm: "",
  });

  const { password } = inputs;

  //오류메세지
  const message = {
    password: "영어, 숫자, 특수문자를 조합하여 8~12자 안으로 입력해주세요😥",
    passwordConfirm: "비밀번호가 일치하지 않습니다😥",
  };

  //유효성
  const [effect, setEffect] = useState({
    password: false,
    passwordConfirm: false,
  });

  const onSubmit = async (e) => {
    const result = userValidChk("submit");
    if (!result.valid) {
      alert("비밀번호가 변경되었습니다!");
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("usercode", localStorage.getItem("usercode"));
    formData.append("password", inputs.password);
    console.log(password);

    await axios
      .put(`${baseUrl}/pwmodify`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        navigator("/update");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //정규식
  const userValidChk = (target) => {
    // check password
    if (target !== "submit" && target === "password") {
      const pwRegExp =
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
      if (!pwRegExp.test(inputs.password)) {
        setEffect({ ...effect, password: false });
        return { valid: false, where: "password" };
      } else {
        setEffect({ ...effect, password: true });
      }
    }

    //check passwordconfirm
    if (target !== "submit" && target === "passwordConfirm") {
      if (inputs.password !== inputs.passwordConfirm) {
        setEffect({ ...effect, passwordConfirm: false });
        return { valid: false, where: "passwordConfirm" };
      } else {
        setEffect({ ...effect, passwordConfirm: true });
      }
    }
    return true;
  };

  const handleValueChange = (e) => {
    inputs[e.target.name] = e.target.value;
    userValidChk(e.target.name);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <h1>비밀번호 수정</h1>
          <div className='form-group mb-1'>
            <span style={{ fontWeight: "bold" }}>비밀번호</span>
            <input
              type='password'
              className='form-control'
              name='password'
              placeholder='영어, 숫자, 특수문자를 조합하여 8~12자 안으로 입력'
              onChange={handleValueChange}
              required
            />

            {!effect.password && inputs.password.length > 0 && (
              <span id='idMsg' style={{ color: "red" }}>
                {message.password}
              </span>
            )}
          </div>

          <div className='form-group mb-1'>
            <span style={{ fontWeight: "bold" }}>비밀번호 확인</span>
            <input
              type='password'
              className='form-control'
              name='passwordConfirm'
              placeholder='비밀번호 확인'
              onChange={handleValueChange}
            />
            {effect.passwordConfirm ? (
              <span id='idMsg' style={{ color: "green" }}>
                비밀번호가 일치합니다😄
              </span>
            ) : (
              <span id='idMsg' style={{ color: "red" }}></span>
            )}

            {!effect.passwordConfirm && inputs.passwordConfirm.length > 0 && (
              <span id='idMsg' style={{ color: "red" }}>
                {message.passwordConfirm}
              </span>
            )}
          </div>
          <span></span>
          <hr />
          <button type='submit' className='btn btn-primary'>
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordModify;
