export const allowedMethod = (req, res, method) => {
  if (req.method !== method) {
    return res.status(404).json({ message: "url not found" });
  }
};

export const Success = (res, data) => {
  return res.status(200).json({ message: "success", body: data });
};

export const ServerError = (res, error) => {
  res.status(500).json({ message: JSON.stringify(error) });
};

export const NoTitle = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "no title" });
  }
};

export const NoEmail = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "no email" });
  }
};

export const NoPassword = (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ message: "no password" });
  }
};

export const NoData = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "no data sent" });
  }
};

export const NoFirstName = (req, res) => {
  if (!req.body.first_name) {
    res.status(400).json({ message: "no first name" });
  }
};

export const NoLastName = (req, res) => {
  if (!req.body.last_name) {
    res.status(400).json({ message: "no last name" });
  }
};

export const PasswordLength = (req, res, minimum) => {
  if (req.body.password.length < minimum) {
    res.status(400).json({
      message: `password must be at least ${minimum} characters long!`,
    });
  }
};
