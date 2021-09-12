import Wrapper from "../../components/sectionWrapper";
import Messages from "./translations/index.json";
import InputsText from "../../translations/input.json";
import { useLangContext } from "../../components/translateContext";
import buttonText from "../../translations/button.json";
import { useState } from "react";
import { useAuthContext } from "../../components/AuthContext";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [User, setUser] = useState({});
  const { promiseInProgress } = usePromiseTracker();
  const { Lang } = useLangContext();
  const Infos = { msg: Messages[Lang], input: InputsText[Lang] };
  const btnMsg = buttonText[Lang];
  const { handleAuthentication } = useAuthContext();

  async function handleSubmit(e) {
    e.preventDefault();
    await sleep(50);
    await handleAuthentication("LOGIN", User);
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  function handleUserChange(e) {
    setUser((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  }
  return (
    <Wrapper>
      <div className="w-12/12 max-w-lg px-4 pricingCard py-8 mx-auto my-32 rounded-xl">
        {Lang === "en" ? (
          <h3 className="text-center">
            {" "}
            {Infos.msg.Title0}{" "}
            <span className="text-qosorange text-opacity-95">
              {Infos.msg.Title1}{" "}
            </span>{" "}
            {Infos.msg.Title2}
          </h3>
        ) : (
          <h3 className="text-center">
            {Infos.msg.Title0} {Infos.msg.Title1}{" "}
            <span className="text-qosorange text-opacity-95">
              {Infos.msg.Title2}{" "}
            </span>
          </h3>
        )}
        <form
          className=""
          onSubmit={(e) => {
            trackPromise(handleSubmit(e));
          }}
        >
          <div className="mx-auto w-full md:max-w-sm mt-10">
            <label className="block">{Infos.input.email.label}</label>
            <input
              onChange={handleUserChange}
              className=""
              name="email"
              type="email"
              required
              placeholder={Infos.input.email.placeholder}
            />
          </div>
          <div className="mx-auto w-full md:max-w-sm mt-10">
            <div className="flex items-center justify-between">
              {" "}
              <label className="block">{Infos.input.password.label}</label>{" "}
              <Link
                className="text-qosblue underline text-msm md:text-dsm"
                to="/register"
              >
                {Infos.msg.passwordForgot}
              </Link>
            </div>
            <input
              onChange={handleUserChange}
              className=""
              name="password"
              type="password"
              required
            />
          </div>
          <button className="w-8/12 h-12 rounded-md text-qosgray text-opacity-80 font-medium bg-qosorange bg-opacity-80 btn-sm md:max-w-sm mx-auto mt-10 block">
            {btnMsg.logInButton}
          </button>
        </form>
        <Loader enable={promiseInProgress} />
      </div>
    </Wrapper>
  );
}
