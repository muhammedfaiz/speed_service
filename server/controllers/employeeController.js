import {
  addService,
  applicationService,
  declineService,
  fetchEmployee,
  getCategoriesService,
  getServiceHelper,
} from "../services/employeeServices.js";
import {
    addFileToS3,
  generateAccessToken,
  generateRefreshToken,
  getFile,
  randomName,
  verifyToken,
} from "../utils/utils.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const application = async (req, res) => {
  try {
    const { name, email, phone, designation, experience } = req.body;

    if (!name || !email || !phone || !designation || !experience) {
      throw new Error("All fields must be provided");
    }
    if (!req.file) {
      throw new Error("Proof document is required");
    }
    const fileName = randomName(req.file);

    await applicationService({
      name,
      email,
      phone,
      designation,
      experience,
      proof: fileName,
    });
    await addFileToS3(req.file,fileName);
    res.status(200).json({ message: "Application submitted" });
  } catch (error) {
    console.log(error);
    res.staus(400).json({ message: error.message });
  }
};

export const employeeLogin = async (req, res) => {
  try {
    const { email, code } = req.body;
    const employee = await fetchEmployee(email);
    if (!employee || employee.code != code) {
      throw new Error("Invalid credentials");
    }
    const accessToken = generateAccessToken({ id: employee._id });
    const refreshToken = generateRefreshToken({ id: employee._id });
    res.cookie("employee_refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        employee: { name: employee.name, email: employee.email },
        token: accessToken,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const employeeLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).json({ message: "Authorization failed" });
    }
    res.clearCookie("employee_refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const employeeRefreshToken = async (req, res) => {
  try {
    const {employee_refreshToken} = req.cookies;
    if(!employee_refreshToken) {
        return res.status(403).json({ message: "Authorization failed" });
    }
    jwt.verify(
        employee_refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, user) => {
          if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
          }
          const newAccessToken = generateAccessToken({ id: user.id });
          res.status(200).json({ accessToken: newAccessToken });
        }
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getServiceData = async (req, res) => {
  try {
    const { token } = req.params;
    const { id } = verifyToken(token);
    const { services, acceptedServices } = await getServiceHelper(id);
    let data = [];
    let accepted = [];
    for(let service of services){
        let obj = {...service._doc};
        let url = await getFile(service.image);
        obj.imageUrl = url;
        data.push(obj);
    }
    for(let service of acceptedServices){
        let obj = {...service._doc};
        let url = await getFile(service.image);
        obj.imageUrl = url;
        accepted.push(obj);
    }
    res.status(200).json({ services:data, acceptedServices:accepted });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const acceptService = async (req, res) => {
  try {
    const { token, id } = req.body;
    const decode = verifyToken(token);
    const result = await addService(id, decode.id);
    if (result) {
      res.status(200).json({ message: "Accepted service successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectService = async (req, res) => {
  try {
    const { token, id } = req.body;
    const decode = verifyToken(token);
    const result = await declineService(id, decode.id);
    if (result) {
      res.status(200).json({ message: "Rejected service successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};