import { useState } from "react";
import AccountConfirmationForm from "../components/login/AccountConfirmationForm";
import RegisterForm from "../components/login/RegisterForm";

const RegisterPage = () => {
  const [emailToConfirm, setEmailToConfirm] = useState<string | undefined>(
    undefined
  );

  if (emailToConfirm) {
    return (
      <div className="flex flex-col items-center">
        <div>
          <div>A confirmation email has been sent to</div>
          <div>{emailToConfirm}</div>
          <br />
        </div>
        <AccountConfirmationForm emailToConfirm={emailToConfirm} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <RegisterForm setEmailToConfirm={setEmailToConfirm} />
    </div>
  );
};

export default RegisterPage;
