import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import { Stinput, StWraps } from "./Styles";

const FindId = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();
  const sendPhoneForCode = () => {
    setIsCode(true);
    LoginAPI.postforVCode(phoneNum)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const findIdHandler = () => {
    LoginAPI.findId({ phoneNum, veriCode })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <h2>아이디찾기</h2>
        <form onSubmit={findIdHandler}>
          <div>
            <div>
              <Stinput
                placeholder=" '-' 제외한 핸드폰번호를 입력하세요"
                type="text"
                required
                name="phone"
                onChange={enterPhoneNum}
              />
            </div>
            <button type="button" onClick={sendPhoneForCode}>
              인증번호받기
            </button>
            {isCode && (
              <div>
                <Stinput
                  placeholder="인증번호를 입력하세요"
                  type="text"
                  required
                  name="vericode"
                  onChange={enterVeriCode}
                />
              </div>
            )}
          </div>
          <button>아이디 찾기</button>
        </form>
        <button onClick={() => navigate(`/findpw`)}>
          비밀번호 찾으러🐾🐾🐾
        </button>
      </div>
    </>
  );
};
export default FindId;
