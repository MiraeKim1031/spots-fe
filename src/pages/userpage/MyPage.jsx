import React, { useEffect, useRef, useState } from 'react';
import {
  StWrap,
  PageDesc,
  Image,
  InfoLayout,
  SportsLayout,
  SportBlock,
  SportTitle,
  ModifyBtn,
  NickName,
  ProfilePhotoInput,
  ProfilePhotoUpload,
  ModifyDiv,
  SaveImage,
  ModifyBlock,
  ModifyBtns,
} from './Styles';
import useToggle from '../../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { __getMyInfo } from '../../redux/modules/userSlice';
import { UserpageAPI } from '../../tools/instance';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import FlexibleHeader from '../../components/FlexibleHeader';
import TapBar from '../../components/TapBar';
import Swal from 'sweetalert2';

const MyPage = () => {
  const title = 'My Profile';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  const { user } = useSelector((state) => state?.user);
  // console.log(user);

  const [isEdit, setIsEdit, clickEditMode] = useToggle();

  const nickRef = useRef();
  const phoneRef = useRef();

  const handleImagePreview = (file) => {
    setImg(null);
    setPreview([]);

    if (file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onloadend = () => {
        setImg(file.target.files[0]);

        const base64 = reader.result;
        if (base64) {
          const previewSub = base64.toString();
          setPreview(previewSub);
        }
      };
    }
  };

  const savePhoto = () => {
    const sendFD = new FormData();
    sendFD.append('image', img);

    UserpageAPI.patchMyPhoto(sendFD)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: '프로필 사진이 수정되었습니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
      })

      .catch((err) => console.log(err));
  };
  console.log('마이페이지유저', user);
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc>내 정보</PageDesc>
        {!isEdit ? (
          <div>
            <Image>
              <img alt='기본프로필사진' src={user?.profileImg} />
            </Image>
            <InfoLayout>
              <div>닉네임</div>
              <NickName>{user?.nickname}</NickName>
              <ModifyBtn onClick={clickEditMode}>프로필 수정</ModifyBtn>
            </InfoLayout>
            <InfoLayout>
              <div>성별</div>
              <div>{user.gender}</div>
            </InfoLayout>
            <InfoLayout>
              <div>휴대폰 번호</div>
              <div>
                {user?.phone?.substr(0, 3)} - {user?.phone?.substr(3, 4)} -{' '}
                {user?.phone?.substr(7)}
              </div>
            </InfoLayout>
            <SportsLayout>
              <SportTitle>나의 운동</SportTitle>
              <SportBlock>
                <div>
                  {user?.sports?.includes('football') ? (
                    <>
                      <img src='/mypage/football_blue.png' />
                    </>
                  ) : (
                    <>
                      <img src='/mypage/football_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes('tennis') ? (
                    <>
                      <img src='/mypage/tennis_blue.png' />
                    </>
                  ) : (
                    <>
                      <img src='/mypage/tennis_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes('badminton') ? (
                    <>
                      <img src='/mypage/badminton_blue.png' />
                    </>
                  ) : (
                    <>
                      <img src='/mypage/badminton_gray.png' />
                    </>
                  )}
                </div>
              </SportBlock>
            </SportsLayout>
            <SportsLayout>
              <SportTitle>관심 운동</SportTitle>
              <SportBlock>
                <div>
                  {user?.favSports?.includes('baseball') ? (
                    <>
                      <img src='/mypage/baseball_blue.png' />
                    </>
                  ) : (
                    <>
                      <img src='/mypage/baseball_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes('basketball') ? (
                    <>
                      <img src='/mypage/basketball_blue.png' />
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src='/mypage/basketball_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes('swim') ? (
                    <>
                      <img src='/mypage/swimming_blue.png' />
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src='/mypage/swimming_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes('running') ? (
                    <>
                      <img src='/mypage/running_blue.png' />
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src='/mypage/running_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes('golf') ? (
                    <>
                      <img src='/mypage/golf_blue.png' />
                    </>
                  ) : (
                    <>
                      <img src='/mypage/golf_gray.png' />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes('health') ? (
                    <>
                      <img src='/mypage/health_blue.png' />
                    </>
                  ) : (
                    <>
                      {' '}
                      <img src='/mypage/health_gray.png' />
                    </>
                  )}
                </div>
              </SportBlock>
            </SportsLayout>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Image>
              {preview.length > 0 ? (
                <img key={1} src={preview} alt='미리보기' />
              ) : (
                <img alt='기본프로필사진' src={user.profileImg} />
              )}
            </Image>
            <ProfilePhotoUpload>
              <label htmlFor='upload-input'>
                <div>+</div>
              </label>
              <ProfilePhotoInput
                id='upload-input'
                // defaultValue={user.profileImg}
                type='file'
                onChange={(e) => {
                  handleImagePreview(e);
                }}
                accept='image/*'
              />
            </ProfilePhotoUpload>
            <SaveImage onClick={savePhoto}>프로필 이미지 저장</SaveImage>
            <ModifyDiv>
              <ModifyBlock>
                <div>닉네임</div>
                <div>
                  <input
                    type='text'
                    defaultValue={user.nickname}
                    ref={nickRef}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      UserpageAPI.patchMyInfo({
                        nickname: nickRef.current.value,
                      })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            Swal.fire({
                              text: '수정이 완료되었습니다',
                              width: '300px',
                              confirmButtonText: '확인',
                              confirmButtonColor: '#40d295',
                              showClass: { popup: 'animated fadeInDown faster' },
                              hideClass: { popup: 'animated fadeOutUp faster' },
                            });
                            window.location.reload();
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          if (err.response.status === 412) {
                            Swal.fire({
                              text: '중복된 닉네임입니다',
                              width: '300px',
                              confirmButtonText: '확인',
                              confirmButtonColor: '#40d295',
                              showClass: { popup: 'animated fadeInDown faster' },
                              hideClass: { popup: 'animated fadeOutUp faster' },
                            });
                          }
                        });
                    }}>
                    변경하기
                  </button>
                </div>
              </ModifyBlock>
              <ModifyBlock>
                <div>휴대폰 번호</div>
                <div>
                  <input type='text' defaultValue={user.phone} ref={phoneRef} />
                </div>
                <div>
                  <button
                    onClick={() => {
                      UserpageAPI.patchMyInfo({ phone: phoneRef.current.value })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            Swal.fire({
                              text: '수정이 완료되었습니다',
                              width: '300px',
                              confirmButtonText: '확인',
                              confirmButtonColor: '#40d295',
                              showClass: { popup: 'animated fadeInDown faster' },
                              hideClass: { popup: 'animated fadeOutUp faster' },
                            });
                            window.location.reload();
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          if (err.response.status === 412) {
                            Swal.fire({
                              text: '중복된 휴대폰 번호입니다',
                              width: '300px',
                              confirmButtonText: '확인',
                              confirmButtonColor: '#40d295',
                              showClass: { popup: 'animated fadeInDown faster' },
                              hideClass: { popup: 'animated fadeOutUp faster' },
                            });
                          }
                        });
                    }}>
                    변경하기
                  </button>
                </div>
              </ModifyBlock>
            </ModifyDiv>
            <ModifyBtns>
              <button onClick={clickEditMode}>수정완료</button>
              <button
                onClick={() => {
                  Swal.fire({
                    title: '탈퇴하시겠습니까?',
                    text: '30일간 휴면 후 개인정보가 삭제됩니다',
                    width: '350px',
                    showCancelButton: true,
                    confirmButtonColor: '#40d295',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '회원탈퇴',
                    cancelButtonText: '취소',
                    showClass: { popup: 'animated fadeInDown faster' },
                    hideClass: { popup: 'animated fadeOutUp faster' },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      UserpageAPI.dropOutMe({ loginId: user.ID })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            localStorage.clear();
                            navigate('/');
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          if (err.status === 400) {
                          }
                        });
                      Swal.fire({
                        text: '계정이 휴면 처리되었습니다',
                        width: '300px',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#40d295',
                        showClass: { popup: 'animated fadeInDown faster' },
                        hideClass: { popup: 'animated fadeOutUp faster' },
                      });
                    }
                  });
                }}>
                회원탈퇴
              </button>
            </ModifyBtns>
          </div>
        )}
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default MyPage;
