import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const LOGIN_STATUS = useSelector((state) => state.auth.isLogin);

  return (
    <div>
      {LOGIN_STATUS ? (
        <>
          <Navbar.Brand href="#home">
            <Nav
              className="me-auto"
              onSelect={() => {
                localStorage.removeItem("token");
                dispatch(LOGIN_STATUS({ isLogin: false }));
              }}
            >
              <Nav.Link href="/login">로그아웃</Nav.Link>
            </Nav>
          </Navbar.Brand>
        </>
      ) : (
        <>
          <Navbar.Brand href="#home">
            <Nav className="me-auto">
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="#features">회원가입</Nav.Link>
            </Nav>
          </Navbar.Brand>
        </>
      )}
    </div>
  );
}

export default Header;
