import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import * as auth from '../utils/auth';
import * as userInfo from '../utils/userInfoApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//  const [user, setUser] = useLocalStorage("user", null);
  const [loggedIn, setLoggedIn] = useLocalStorage(/*() => {
    const token = localStorage.getItem('token');
    return token !== null;
}*/ "loggedIn", false);
  const navigate = useNavigate();
  const [isRegisterFirstStepOk, setIsRegisterFirstStepOk] = useState(false);
  const [isRegistrationInfoTooltipOpen, setIsRegistrationInfoTooltipOpen] = useState(false);

  const handleRegistrationInfoTooltipOpen = () => {
    setIsRegistrationInfoTooltipOpen(!isRegistrationInfoTooltipOpen);
  }

  const reg = ({email, password}) => {
    const registerData = {
      email: email,
      password: password
    };
    auth.register(registerData)
      .then(data => {
        if (data) {
          setLoggedIn(false);
        //  setUser(null);
          navigate('/confirm-email', {replace: true});
          setIsRegisterFirstStepOk(true);
          handleRegistrationInfoTooltipOpen();
        }
        else {
          setIsRegisterFirstStepOk(false);
          handleRegistrationInfoTooltipOpen();
        }
      })
      .catch(err => {
        setIsRegisterFirstStepOk(false);
        handleRegistrationInfoTooltipOpen();
        console.log(err)
    })
  }

  const confirm = (data) => {
    auth.confirmEmail(data)
    .then(res => {
      if (res.is_email_confirmed) {
        navigate('/finish-registration', {replace: true});
      }
    })
    .catch(err => {
      setIsRegisterFirstStepOk(false);
      handleRegistrationInfoTooltipOpen();
      console.log(err)
    })
  }

  const finishReg = ({ email, name, phone, companyName, tariffId }) => {
    const registerData = {
        email: email,
        name: name,
        phone: phone,
        company_name: companyName,
        tariffId: tariffId,
    };
    console.log(registerData);
    auth.completeRegister(registerData)
    .then(data => {
        if (data.name) {
          setLoggedIn(true);
        //  setUser(data.name);
          navigate('/groups', {replace: true});
        }
        else {
          setLoggedIn(false);
        //  setUser(null);
          setIsRegisterFirstStepOk(false);
          handleRegistrationInfoTooltipOpen();
          }
        })
    .catch(err => {
        setIsRegisterFirstStepOk(false);
        handleRegistrationInfoTooltipOpen();
        console.log(err);
    })
}

  const login = ({email, password}) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.access_token) {
          userInfo.getUserInfo()
            .then(info => {
              if (info.name) {
                setLoggedIn(true);
              //  setUser(info.name);
                navigate('/groups', {replace: true});
              }
              else {
                setLoggedIn(false);
              //  setUser(null);
                navigate('/confirm-email', {replace: true});
              }
            })
        }
        else {
          console.log('Авторизация не удалась');
        }
      })
      .catch(err => {
        setIsRegisterFirstStepOk(false);
        handleRegistrationInfoTooltipOpen();
        console.log(err);
      });
  };

  const logout = () => {
    setLoggedIn(false);
  //  setUser(null);
    localStorage.removeItem('token');
    navigate("/start", { replace: true });
  };

  const value = useMemo(
    () => ({
      loggedIn,
      isRegisterFirstStepOk,
      isRegistrationInfoTooltipOpen,
      handleRegistrationInfoTooltipOpen,
      reg,
      confirm,
      finishReg,
      login,
      logout
    }),
    [loggedIn, isRegistrationInfoTooltipOpen, isRegistrationInfoTooltipOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
