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
  const [ errTitle, setErrTitle ] = useState('');
  const [ errMessage, setErrMessage ] = useState('');
  const errTitleUnautorized = 'Ошибка авторизации';
  const errMessageWrongCredentials = 'Неправильные логин или пароль. Проверьте свои регистрационные данные';
  const errTitleWrongCode = 'Ошибка подтверждения';
  const errMessageWrongCode = 'Неверный код'

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
      setErrTitle(errTitleWrongCode);
      setErrMessage(errMessageWrongCode);
      handleRegistrationInfoTooltipOpen();
      console.log(err)
    })
  }

  const finishReg = ({ name, phone, companyName, tariffId }) => {
    const registerData = {
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
              if (info.is_superuser) {
                setLoggedIn(true);
                navigate('/clients', {replace: true});
                console.log('clients')
              }
              else {
                if (info.name /* && info.company_name && info.tariff.id*/) {
                  setLoggedIn(true);
                  navigate('/groups', {replace: true});
                  console.log('groups')
                }
                else {
                  setLoggedIn(false);
                  navigate('/confirm-email', {replace: true});
                }
              }
            })
        }
      })
      .catch(err => {
        setIsRegisterFirstStepOk(false);
        setErrTitle(errTitleUnautorized);
        setErrMessage(errMessageWrongCredentials);
        handleRegistrationInfoTooltipOpen();
        console.log(err);
      });
  };

  const recoveryPass = (email) => {
    console.log(email);
  }

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
      errTitle,
      errMessage,
      handleRegistrationInfoTooltipOpen,
      reg,
      confirm,
      finishReg,
      login,
      recoveryPass,
      logout
    }),
    [loggedIn, isRegistrationInfoTooltipOpen, isRegistrationInfoTooltipOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
