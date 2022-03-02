import Wrapper from "../../components/sectionWrapper";
import Messages from "./translations/index.json";
import InputsText from "../../translations/input.json";
import { useLangContext } from "../../components/translateContext";
import buttonText from "../../translations/button.json";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/AuthContext";
import { Link } from "react-router-dom";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "../../components/Loader";

export default function RegisterPage() {
  const { Lang } = useLangContext();
  const Infos = { msg: Messages[Lang], input: InputsText[Lang] };
  const btnMsg = buttonText[Lang];
  const { promiseInProgress } = usePromiseTracker();
  const [User, setUser] = useState({
    profil: "/pictures/user.png",
  });
  const { handleAuthentication } = useAuthContext();

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {});

  function handleInputChange(e) {
    setUser((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await sleep(50);
    await handleAuthentication("REGISTER", User);
  }

  return (
    <Wrapper
      style={{
        background: "url('./pictures/authpageBackground.png')",
        backgroundSize: "80% 1%",
      }}
    >
      <div className="w-12/12 max-w-screen-md px-4 pricingCard py-8 mx-auto my-32 rounded-xl">
        <h3 className="text-center">Create Account</h3>
        <form
          className=""
          onSubmit={(e) => {
            trackPromise(handleSubmit(e));
          }}
        >
          <div className="flex items-center">
            <div className="w-1/2 mx-4">
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <label className="block">{Infos.input.firstname.label}</label>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="firstname"
                  type="text"
                  required
                  placeholder={Infos.input.firstname.label}
                />
              </div>
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <label className="block">{Infos.input.lastname.label}</label>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="lastname"
                  type="text"
                  required
                  placeholder={Infos.input.lastname.placeholder}
                />
              </div>
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <label className="block">{Infos.input.email.label}</label>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="email"
                  type="email"
                  required
                  placeholder={Infos.input.email.placeholder}
                />
              </div>
            </div>
            <div className="w-1/2 mx-4">
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <div className="flex items-center justify-between">
                  {" "}
                  <label className="block">
                    {Infos.input.passwordC.label}
                  </label>{" "}
                </div>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="poste"
                  type="text"
                  required
                />
              </div>
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <div className="flex items-center justify-between">
                  {" "}
                  <label className="block">
                    {Infos.input.password.label}
                  </label>{" "}
                </div>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="password"
                  type="password"
                  required
                  minLength={8}
                />
              </div>
              <div className="mx-auto w-full md:max-w-sm mt-5">
                <div className="flex items-center justify-between">
                  {" "}
                  <label className="block">Comfirm password :</label>{" "}
                </div>
                <input
                  onChange={handleInputChange}
                  className=""
                  name="passwordComfirm"
                  type="password"
                  required
                  minLength={8}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-8/12 h-12 rounded-md text-qosgray text-opacity-80 font-medium bg-qosorange bg-opacity-80 btn-sm md:max-w-sm mx-auto mt-10 block"
          >
            {btnMsg.registerButton}
          </button>
          <Link
            className="block mx-auto text-qosblue text-mmd max-w-max mt-4"
            to="/"
          >
            Already have Account ?
          </Link>
        </form>
        <Loader enable={promiseInProgress} />
      </div>
    </Wrapper>
  );
}
