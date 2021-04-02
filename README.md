# golfriend-front-update2
<img src="https://user-images.githubusercontent.com/71859468/113385433-1d098100-93c3-11eb-9c8b-04d2ae6d1c78.jpg" width="200" />
 골프렌드는 골프 스윙 동영상을 8개의 자세로 나누고 각 자세에서 개선점을 알려주는 애플리케이션입니다.  
 
  * ## 사용도구
    * Python (Flask, Pytorch, OpenCV, Yolo, OpenPose)
    * JavaScript (React Native)
    * AWS
    * MongoDB
    
  **Pytorch**로 구현한 **CNN**, **RNN** 모델로 전체 스윙 프레임에서 특정 8개 자세를 추출했습니다.  
  **OpenPose**로 사람의 바디 포인트를 감지합니다.  
  **Yolo**로 Custom Object를 학습시켜 골프 클럽을 탐지합니다.  
  **Flask**를 활용하여 REST API 서버를 구축했습니다. 서버는 **AWS**에서 구동합니다.  
  앱은 **React Native**를 활용하여 Android, IOS 두 플랫폼에서 배포하는 것을 목표로 했습니다.  
  유저 데이터를 저장하는데 **MongoDB**와 **PyMongo** 를 활용했습니다.  
  
## 골프 자세 추출 모델
  골프 자세를 크게 8개 자세로 나누고 해당 자세에서 프로의 스윙과 각 포인트를 비교하여 피드백을 주게 됩니다. 8개 자세는 Address, Take Away, Back Swing, Top, Down Swing, Impact, 
Release, Finish 입니다.  
 https://github.com/wmcnally/golfdb  
 위 링크에서 많은 부분을 참고했습니다. 이미지 처리엔 MobileNet이 사용되었고 이미지에서 얻은 가중치가 LSTM 모델로 입력됩니다.  
 **OpenPose**를 활용하여 해당 자세에서 사람의 바디 포인트를 얻게 됩니다.(https://github.com/CMU-Perceptual-Computing-Lab/openpose) 프로의 바디 포인트와 유저의 바디 포인트를 비교하여
 피드백을 줍니다. 골프 스윙은 바디 포인트 분석만으로는 한계가 있어 골프 클럽의 궤도 또한 파악해야했습니다. 이미지 맟 동영상에서 골프 클럽을 탐지하기 위해 **Yolo**를 활용했습니다. 5000개의
 스윙 이미지에서 골프 클럽을 마크하고 Yolo Custom Object를 학습시켰습니다.(https://github.com/pjreddie/darknet)  
 
 <p float="left">
  <img src="https://user-images.githubusercontent.com/71859468/113387367-28f74200-93c7-11eb-8020-8378a25d631c.png" width="1000" />
  <img src="https://user-images.githubusercontent.com/71859468/113387340-1846cc00-93c7-11eb-929c-1c7d3f17ba31.png" width="400" /> 
</p>

## 분석결과  
  정면, 측면 스윙을 포함하여 약 30개의 포인트를 체크합니다.
<p float="left">
  <img src="https://user-images.githubusercontent.com/71859468/113385021-3958ee00-93c2-11eb-9e46-867aa0d9ff19.jpg" width="300" />
  <img src="https://user-images.githubusercontent.com/71859468/113385009-33fba380-93c2-11eb-97e8-38292e1c31bf.jpg" width="300" /> 
  <img src="https://user-images.githubusercontent.com/71859468/113385021-3958ee00-93c2-11eb-9e46-867aa0d9ff19.jpg" width="300" />
</p>



## 기록페이지
  MongoDB를 활용하여 유저 데이터를 저장합니다. 프로 스윙과 비교하여 각 체크 포인트마다 점수를 매기게 됩니다. 일정 점수 이상인 자세는 **프로샷**으로 구분하였습니다. 일정 점수 이하면 **개선
  사항**으로 구분합니다. 분석 이용 횟수나 다른 유저에게 내 스윙을 공유한 횟수가 일정 수 이상이면 뱃지를 발급합니다.
<p float="left">
  <img src="https://user-images.githubusercontent.com/71859468/113385339-e7fd2e80-93c2-11eb-94b6-e0337e0df23f.jpg" width="300" />
  <img src="https://user-images.githubusercontent.com/71859468/113385342-e9c6f200-93c2-11eb-984a-22eaa47b1d84.jpg" width="300" />
</p>



## 소셜페이지  
  분석 페이지에서 다른 앱으로 공유하거나 골프렌드 소셜에 업로드 가능합니다. 좋아요, 댓글 기능을 구현하였습니다.
<p float="left">
  <img src="https://user-images.githubusercontent.com/71859468/113385239-b2584580-93c2-11eb-87e3-fc63d64bb246.jpg" width="300" />
</p>


