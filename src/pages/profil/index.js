import Wrapper from "../../components/sectionWrapper";
import Messages from "./translations/index.json";
import InputsText from "../../translations/input.json";
import { useLangContext } from "../../components/translateContext";
import buttonText from "../../translations/button.json";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/AuthContext";

export default function ProfilPage() {
  const { Lang } = useLangContext();
  const Infos = { msg: Messages[Lang], input: InputsText[Lang] };

  const { firstname, lastname, poste, profil, email } = JSON.parse(
    localStorage.getItem("qosToken")
  );

  const [newCredential, setNewCredential] = useState({
    password: "",
    Npassword: "",
    passwordC: "",
  });
  const [User, setUser] = useState({
    firstname,
    lastname,
    poste,
    profil,
    email,
  });

  const { handleAuthentication } = useAuthContext();

  useEffect(() => {});

  function handleInputChange(e) {
    setUser((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  }

  function convertTo() {
    let input = document.querySelector("#FilePost");
    let file = input.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setUser((prev) => {
        return { ...prev, profil: reader.result };
      });
    };
    reader.readAsDataURL(file);
  }
  function handleCredentialInputChange(e) {
    setNewCredential((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  }
  function handleSubmit(e, credential) {
    e.preventDefault();
    credential
      ? handleAuthentication("UPDATE", newCredential, credential)
      : handleAuthentication("UPDATE", User, credential);
  }
  return (
    <div className="w-12/12 flex max-w-screen-xl mr-4 justify-between px-4 py-4 mx-auto h-screen items-center rounded-xl">
      <form
        className="w-7/12 min-w-max bg-qosgray p-8 shadow-md rounded-lg"
        onSubmit={(e) => {
          handleSubmit(e, false);
        }}
      >
        <div className="flex">
          <div className="w-1/2 mx-4">
            <div className="mx-auto w-full md:max-w-sm mt-5">
              <label className="block">{Infos.input.firstname.label}</label>
              <input
                onChange={handleInputChange}
                className=""
                name="firstname"
                type="text"
                required
                value={User.firstname}
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
                value={User.lastname}
                placeholder={Infos.input.lastname.placeholder}
              />
            </div>
          </div>
          <div className="w-1/2 mx-4">
            <div className="mx-auto w-full md:max-w-sm mt-5">
              <label className="block">{Infos.input.email.label}</label>
              <input
                onChange={handleInputChange}
                className=""
                name="email"
                type="email"
                required
                value={User.email}
                placeholder={Infos.input.email.placeholder}
              />
            </div>
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
                value={User.poste}
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-8/12 h-12 rounded-md text-qosgray text-opacity-80 font-medium bg-qosorange bg-opacity-80 btn-sm md:max-w-sm mx-auto mt-10 block"
        >
          Update
        </button>
      </form>
      <form
        onSubmit={(e) => {
          handleSubmit(e, true);
        }}
        className="bg-qosgray p-2 rounded-lg w-4/12 min-w-max px-10 pb-8"
      >
        <div className="mx-auto w-full md:max-w-sm mt-5">
          <div className="flex items-center justify-between">
            {" "}
            <label className="block">{Infos.input.password.label}</label>{" "}
          </div>
          <input
            onChange={handleCredentialInputChange}
            className=""
            name="password"
            type="password"
          />
        </div>
        <div className="mx-auto w-full md:max-w-sm mt-5">
          <div className="flex items-center justify-between">
            {" "}
            <label className="block">{Infos.input.passwordN.label}</label>{" "}
          </div>
          <input
            onChange={handleCredentialInputChange}
            className=""
            name="Npassword"
            type="password"
          />
        </div>
        <div className="mx-auto w-full md:max-w-sm mt-5">
          <div className="flex items-center justify-between">
            {" "}
            <label className="block">Comfirm password:</label>{" "}
          </div>
          <input
            onChange={handleCredentialInputChange}
            className=""
            name="passwordC"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="w-8/12 h-12 rounded-md text-qosgray text-opacity-80 font-medium bg-qosorange bg-opacity-80 btn-sm md:max-w-sm mx-auto mt-10 block"
        >
          Update
        </button>
      </form>
    </div>
  );
}
