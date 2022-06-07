import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  BsFillCaretLeftFill,
  BsFillGeoAltFill,
  BsCalendar2Check,
  BsFillTelephoneFill,
  BsEmojiLaughing,
} from "react-icons/bs";

const hotelInfo = [
  {
    id: 1,
    image: "/image/room1.jpg",
    title: "[인천] 개편한 세상",
    location: "인천광역시 남동구",
    locationDetail: "인천광역시 남동구 석촌로 27",
    grade: "5성급",
    checkIn: "16:00",
    checkOut: "10:00",
    call: "032)123-4567",
    describe:
      "개편한세상은 강아지 위탁 관리 전문입니다. 국제 전문 자격증 + 국내 전문 자격증을 고루 갖추고 있으며, 반려견 교육 전문가가 직접 서비스를 제공하는 프리미엄 애견 유치원도 운영중입니다.",
    describe_detail_one_title: "편의시설",
    describe_detail_one_detail:
      "애견유치원, 애견호텔, 강아지 놀이방, 펫택시, 애견 미용 모두 갖추고 있으며, 비용 및 예약은 전화로 문의해주시기 바랍니다.",
    describe_detail_two_title: "일일 스케줄",
    describe_detail_two_detail: "교육 스케줄은 개별 맞춤 설계되고 있습니다.",
    describe_detail_three_title: "맞춤 교육",
    describe_detail_three_detail:
      "체계적인 학습 커리큘럽으로 각기 다른 성격을 가진 강아지들을 각자의 성향에 맞게 전문적인 학습을 설계합니다. 강압적인 교육은 절대 하지 않습니다. 긍정을 강화한 교육을 진행함으로 강아지들에게 스스로 즐겁게 교육을 하게 되는 동기를 부여하며 만족스러운 결과를 만들어냅니다.",
  },

  {
    id: 2,
    image: "/image/room2.png",
    title: "[서울] 앨리스 애견호텔",
    location: "서울 강남구",
    locationDetail: "서울특별시 강남구 석남동 132-1 ",
    grade: "5성급",
    checkIn: "13:00",
    checkOut: "11:00",
    call: "02)123-4567",
    describe:
      "앨리스애견호텔은 집에서 아이들과 함께 밥을 먹고 자는, 24시간내내 함께 생활하는 애견호텔입니다. 실시간 사진 서비스를 제공하여 믿고 안심하실 수 있습니다.",
    describe_detail_one_title: "편의시설",
    describe_detail_one_detail:
      "산책로, 대형견/중형견/소형견 전용 운동장, 애견 수영장, 애견 샤워장 등",
    describe_detail_two_title: "동물병원",
    describe_detail_two_detail:
      "돌봄원 지정 동물병원이 있어 아이가 혹여 다치게 되더라도 빠른 치료가 가능합니다. 진료 외에는 다른 영업 (분양, 교배, 미용, 관련 용품 판매 등)을 하지 않는 곳이기 때문에 진료에만 집중할 수 있습니다.",
    describe_detail_three_title: "목욕 및 미용",
    describe_detail_three_detail:
      "목욕은 기본적으로 1회 무료이며 그 이상으로 필요한 경우 개별 상담이 필요합니다. 미용은 털이 많이 자란 상태이거나 지저분하게 보일 경우 보호자와 상의 후 실행하고 있습니다. 자세한 비용은 전화로 문의해주시기 바랍니다.",
  },
  {
    id: 3,
    image: "/image/room3.png",
    title: "[경기] 망고쿠로",
    location: "경기 고양시",
    locationDetail: "경기도 고양시 대덕구 오정로78번길",
    grade: "4성급",
    checkIn: "17:00",
    checkOut: "11:00",
    call: "031)123-4567",
    describe:
      "여행을 가도, 우리 아이가 적응은 잘하고 있는지 걱정되시죠? 밥은 잘 먹고있는지, 다른 아이들과는 잘 어울리고 있는지 동영상 또는 사진을 바로 찍어 보내드립니다. 아이에게 특별히 신경써야하는 부분이 있다면 따로 메모해주시기 바랍니다.",
    describe_detail_one_title: "편의시설",
    describe_detail_one_detail:
      "반려견들을 위한 안락한 견사시설과 즐겁게 뛰어놀며 운동, 산책, 교육을 받을 수 있는 운동장 시설 드라이룸, 애견 휴게실, 전문관리사의 관리프로그램으로 반려견과 반려인 모두가 행복하게 머물 수 있습니다.",
    describe_detail_two_title: "유치원&호텔",
    describe_detail_two_detail:
      "함께하는 모든 친구들 각자의 성향, 나이, 신체능력에 따라 그에 맞는 활동, 놀이, 교육,식사 프로그램으로 더욱 세심하게 아이들을 케어합니다. 단순히 아이들만 모아 놓는 유치원 호텔이 아닌 반려견 전문 교육,관리사가 24시간 상주하며 반려견 각각의 특성을 파악하여 모든 아이들이 건강하고 행복한 시간을 보낼 수 있도록 세심하게 관리 하고 있습니다.",
    describe_detail_three_title: "맞춤 교육",
    describe_detail_three_detail:
      "교육 이념은 반려견들이 폭넓은 사회성을 바탕으로 서로 상호존중하는 마음을 알아가며 몸도 마음도 건강하게 어디에서도 사랑 듬뿍 받을 수 있는 친구들이 될 수 있기를 진심으로 바라는 마음입니다. 첫번째로 중요한것은 편안한 마음으로 사회를 받아들일 수 있는 사회화이며 그다음 두번째로는 상대방을 존중 할 수 있는 마음을 배우는 매너 예절 학습입니다. 사회화 학습과 예절 학습 무엇하나 빼놓지 않고 정말 중요한 학습입니다. 망고쿠로는 사회화 예절 학습의 중요성을 10년동안의 경험을 통하여 너무나도 잘 알고 있습니다. 성격이 소심한 아이, 지나치게 과한 아이 , 성격이 너무 좋은아이 각자 다른 성격의 친구들이 한자리에 모이겠지만 저희 망고쿠로가 아이들 중심에 서서 서로가 좋은 영향이 될 수 있도록 잘 이끌어 나가겠습니다.",
  },
];
console.log("hotelInfo", hotelInfo);
const RoomList = () => {
  const { id } = useParams();
  const parseId = parseInt(id);

  return (
    <div>
      <Link to="/room_reservation" style={{ textDecoration: "none" }}>
        <span style={{ color: "#ffaf2d", fontSize: "2rem" }}>
          <BsFillCaretLeftFill />
        </span>
        <span
          style={{
            color: "#807D7D",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Hotel List
        </span>
      </Link>
      {hotelInfo.map((item, key) => {
        const {
          image,
          title,
          call,
          checkIn,
          checkOut,
          describe,
          describe_detail_one_title,
          describe_detail_two_title,
          describe_detail_three_title,
          describe_detail_one_detail,
          describe_detail_two_detail,
          describe_detail_three_detail,
          grade,
          location,
          locationDetail,
        } = item;
        //hotelInfo id - useParams로 받아온 id 두개 식별하는 조건문 필요
        if (parseId === item.id) {
          return (
            <div key={parseId} style={{ width: "1200px", margin: "0 auto" }}>
              <Row style={{ height: "340px", paddingTop: 30 }}>
                <Col>
                  <Image
                    src={image}
                    style={{ height: "300px", width: "100%" }}
                  />
                </Col>
                <Col>
                  <h3
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingBottom: 30,
                    }}
                  >
                    {title}
                  </h3>
                  <h5 style={{ fontWeight: "600" }}> - 위치: {location}</h5>
                  <h5 style={{ fontWeight: "600", paddingBottom: 130 }}>
                    - 호텔 등급: {grade}
                  </h5>

                  <Button
                    type="submit"
                    href={`/room_reserve/${id}`}
                    style={{
                      backgroundColor: "#ffaf2d",
                      border: "none",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    예약서 작성하기
                  </Button>
                </Col>
              </Row>
              <Row style={{ height: "260px", marginBottom: 50 }}>
                <div
                  style={{
                    backgroundColor: "#FFFBF5",
                    borderRadius: 10,
                    marginTop: 30,
                    padding: "50px 30px 30px 50px",
                  }}
                >
                  <div style={{ paddingBottom: 15 }}>
                    <BsFillGeoAltFill
                      style={{
                        color: "#ffaf2d",
                        fontSize: "1.5rem",
                        marginRight: 10,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>{locationDetail}</span>
                  </div>
                  <div style={{ paddingBottom: 15 }}>
                    <BsCalendar2Check
                      style={{
                        color: "#ffaf2d",
                        fontSize: "1.5rem",
                        marginRight: 10,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>
                      {checkIn} | {checkOut}
                    </span>
                  </div>
                  <div style={{ paddingBottom: 15 }}>
                    <BsFillTelephoneFill
                      style={{
                        color: "#ffaf2d",
                        fontSize: "1.5rem",
                        marginRight: 10,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>{call}</span>
                  </div>
                  <div>
                    <BsEmojiLaughing
                      style={{
                        color: "#ffaf2d",
                        fontSize: "1.5rem",
                        marginRight: 10,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>{describe}</span>
                  </div>
                </div>
              </Row>
              <Row style={{ height: "500px", paddingBottom: 30 }}>
                <h4
                  style={{
                    fontWeight: 700,
                    color: "#ffaf2d",
                    paddingBottom: 10,
                  }}
                >
                  {describe_detail_one_title}
                </h4>
                <div style={{ fontWeight: "bold" }}>
                  {describe_detail_one_detail}
                </div>

                <h4
                  style={{
                    fontWeight: 700,
                    color: "#ffaf2d",
                    paddingBottom: 10,
                    paddingTop: 30,
                  }}
                >
                  <div>{describe_detail_two_title}</div>
                </h4>
                <div style={{ fontWeight: "bold" }}>
                  {describe_detail_two_detail}
                </div>

                <h4
                  style={{
                    fontWeight: 700,
                    color: "#ffaf2d",
                    paddingBottom: 10,
                    paddingTop: 30,
                  }}
                >
                  {describe_detail_three_title}
                </h4>
                <div style={{ fontWeight: "bold" }}>
                  {describe_detail_three_detail}
                </div>
              </Row>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RoomList;
