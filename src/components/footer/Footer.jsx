"use client";
//Import own components
import Contact from "../contact/Contact";
import Formulary from "../formulary/formulary";
//Import react fuctions
import {useEffect, useRef, useState} from "react";

export default function Footer({
  formularyTitle,
  inputName,
  inputEmail,
  inputPhone,
  buttonFormulary,
  contactTitle,
  contactSubtitle,
}) {
  const [numberPhone, setNumberphone] = useState();
  const [validated, setValidated] = useState(false);
  const formRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cuestionAdd, setCuestionAdd] = useState("");
  const [scortAfitrion, setScortAfitrion] = useState("");

  useEffect(() => {
    const form = formRef.current;

    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);

      form.classList.add("was-validated");
    });

    return () => {
      form.removeEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      });
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //validación del los campos del formulario
    if (
      name == "" ||
      email == "" ||
      numberPhone == "" ||
      cuestionAdd == "" ||
      scortAfitrion == "Selecciona Huesped o Escort Anfitrión"
    ) {
      return;
    }
    try {
      //Petición post para registrar al usuario
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: numberPhone,
          scort: scortAfitrion,
          cuestion: cuestionAdd,
        }),
      });

      if (response.ok){
        setName('')
        setEmail('')
        setNumberphone('')
        setCuestionAdd('')
        setScortAfitrion('')
        console.log("Registrado")
      }
    } catch (error) {}
  };

  return (
    <footer className="bg-orange w-100" id="footerSection">
      <div className="container py-lg-5">
        <div className="row py-4 py-lg-5">
          <div className="col-12 col-lg-6">
            <div className="card my-3 my-lg-0 p-3 p-lg-5">
              <Formulary
                formularyTitle={formularyTitle}
                showButton={true}
                name={name}
                email={email}
                cuestionAdd={cuestionAdd}
                scortAfitrion={scortAfitrion}
                inputName={inputName}
                numberPhone={numberPhone}
                inputEmail={inputEmail}
                inputPhone={inputPhone}
                buttonFormulary={buttonFormulary}
                setEmail={setEmail}
                formRef={formRef}
                setName={setName}
                setNumberphone={setNumberphone}
                setCuestionAdd={setCuestionAdd}
                setScortAfitrion={setScortAfitrion}
                onSubmit={onSubmit}
              />
            </div>
          </div>

          <div className="col-12 col-lg-6 my-auto">
            <Contact
              contactTitle={contactTitle}
              contactSubtitle={contactSubtitle}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
