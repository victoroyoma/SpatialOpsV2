const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

// JWT Secret from environment variable
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "30days",
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = generateToken(user);

    res
      .status(201)
      .send({ user: { id: user.id, email, firstName, lastName }, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
