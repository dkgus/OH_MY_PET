import React from "react";
import { Card, Button } from "react-bootstrap";

const EventReservation = () => {
  const hotelInfo = [
    {
      id: 1,
      name: "반려동물 패션쇼",
      title: "참여만 하면 반려동물 소품이 쏟아집니다!",
      text: "다양한 경품이 준비되어있으니 많은 참여 부탁드립니다~",
      img: "/image/event1.jpg",
    },
    {
      id: 2,
      name: "반려동물과 피크닉",
      title: "많은 동물들이 함께 피크닉을 즐길 수 있습니다!",
      text: "이벤트에 참여해서 반려동물의 소중한 순간을 남겨보세요! 노즈워크 선물은 덤!",
      img: "/image/event2.jpg",
    },
    {
      id: 3,
      name: "망고쿠로 방문후기 특별이벤트",
      title: "이벤트 기간동안 망고쿠로 팻 리조트 방문",
      text: "이벤트기간동안 방문시 15% 할인과 함께 무료조식이 제공됩니다.",
      img: "/image/event3.jpg",
    },
  ];
  return (
    <div style={{ height: 1400 }}>
      <h3
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #f7f4f0",
          marginBottom: 50,
          paddingBottom: 10,
        }}
      >
        Event List
      </h3>
      <div
        className="cardBox"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        {hotelInfo.map((item) => {
          const { name, title, text, img } = item;
          return (
            <>
              <Card style={{ width: "60rem", border: "none" }}>
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
                    <b style={{ fontSize: "1rem", color: "#ffaf2d" }}>
                      {title}
                    </b>
                    <br />
                    <div style={{ fontWeight: "600" }}>{text}</div>
                  </Card.Text>

                  <Button
                    type="submit"
                    href={`/event_reservation/form`}
                    style={{
                      backgroundColor: "#ffaf2d",
                      border: "none",
                      fontWeight: "bold",
                      width: "80%",
                      margin: "auto",
                    }}
                  >
                    신청하기
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

export default EventReservation;
