import { Request, Response } from "express";
import companyModel from "../Model/CompanyModels";
import crypto from "crypto";
import { companyEmailVerification } from "../../Utils/Email";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyModel.find();

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findById(id);

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findByIdAndUpdate(
      id,
      {},
      { new: true }
    );

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const token = crypto.randomBytes(64).toString("hex");
    const OTP = crypto.randomBytes(2).toString("hex");
    const RCNumber = crypto.randomBytes(4).toString("hex");

    const companies = await companyModel.create({
      email,
      password,
      name,
      token,
      RCNumber,
      OTP,
    });

    companyEmailVerification(companies).then(() => {
      console.log("email sent");
    });

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

// Verify a company:
export const VerifyCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findById(id);

    if (companies!.token !== "") {
      const company = await companyModel.findByIdAndUpdate(
        id,
        {
          token: "",
          verified: true,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "companies",
        data: company,
      });
    } else {
      res.status(400).json({
        message: "An error occured in verification",
      });
    }

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

// Sign in a comapny:
export const SignInCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const companies = await companyModel.findOne({ email });

    if (companies) {
      if (password === companies?.password) {
        if (companies?.verified && companies?.token === "") {
          res.status(200).json({
            message: "Welcome back",
            data: companies,
          });
        } else {
          res.status(400).json({
            message: "Account not verified",
          });
        }
      } else {
        res.status(400).json({
          message: "User Email Error",
        });
      }
    } else {
      res.status(400).json({
        message: "User Password Error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Forget your password:
export const ForgetComapnyPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const companies = await companyModel.findOne({ email });

    if (companies) {
      if (password === companies?.password) {
        if (companies?.verified && companies?.token === "") {
          res.status(200).json({
            message: "Welcome back",
            data: companies,
          });
        } else {
          res.status(400).json({
            message: "Account not verified",
          });
        }
      } else {
        res.status(400).json({
          message: "User Email Error",
        });
      }
    } else {
      res.status(400).json({
        message: "User Password Error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
