import React from "react";
import { Card, Button } from "react-bootstrap";

const RoomReservation = () => {
  const hotelInfo = [
    {
      id: 1,
      name: "[인천] 개편한 세상",
      title: "개편한세상은 강아지 위탁 관리 전문입니다.",
      text: "국제 전문 자격증 + 국내 전문 자격증을 고루 갖추고 있으며 반려견 교육 전문가가 직접 서비스를 제공하는 프리미엄 애견 유치원도 운영중입니다.",
      img: "/image/room.png",
    },
    {
      id: 2,
      name: "[서울] 앨리스애견호텔",
      title:
        "앨리스애견호텔은 집에서 아이들과 함께 밥을 먹고 자는, 24시간내내 함께 생활하는 애견호텔입니다.",
      text: "실시간 사진 서비스를 제공하여 믿고 안심하실 수 있습니다.",
      img: "/image/room2.png",
    },
    {
      id: 3,
      name: "[경기] 망고쿠로",
      title: "여행을 가도, 우리 아이가 적응은 잘하고 있는지 걱정되시죠?",
      text: "밥은 잘 먹고있는지, 다른 아이들과는 잘 어울리고 있는지 동영상 또는 사진을 바로 찍어 보내드립니다.아이에게 특별히 신경써야하는 부분이 있다면 따로 메모해주시기 바랍니다.",
      img: "/image/room3.png",
    },
  ];

  return (
    <div style={{ height: 652 }}>
      <h3
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #f7f4f0",
          marginBottom: 50,
          paddingBottom: 10,
        }}
      >
        Hotel List
      </h3>
      <div
        className="cardBox"
        style={{ display: "flex", gap: 80, justifyContent: "center" }}
      >
        {hotelInfo.map((item) => {
          const { name, title, text, img, id } = item;
          return (
            <>
              <Card style={{ width: "20rem", border: "none" }}>
                <Card.Img variant="top" src={`${img}`} />
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px 0 0 0",
                  }}
                >
                  <Card.Title>
                    <b>{name}</b>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.8rem", paddingBottom: 50 }}>
                    <b>{title}</b>
                    <br />
                    {text}
                  </Card.Text>

                  <Button
                    type="submit"
                    href={`/room_list/${id}`}
                    style={{
                      backgroundColor: "#ffaf2d",
                      border: "none",
                      fontWeight: "bold",
                      width: "80%",
                      margin: "auto",
                    }}
                  >
                    자세히 보기
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RoomReservation;
