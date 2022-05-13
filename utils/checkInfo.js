const { check, validationResult } = require("express-validator");

exports.checkRegister = [
  check("name", "이름을 작성해주세요").notEmpty(),
  check("nickname", "닉네임을 작성해주세요").notEmpty(),
  check("email", "이메일을 작성해주세요").notEmpty(),
  check("email", "이메일 양식을 사용해주세요").isEmail(),
  check("password", "6자 이내로 발급해주세요").isLength({ min: 6 }),
  check("memPwRe", "비밀번호를 확인해주세요").notEmpty(),
  check("phone", "휴대폰 번호를 입력해주세요").notEmpty(),
  check("type", "반려동물의 종류를 선택해주세요").notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  },
];
