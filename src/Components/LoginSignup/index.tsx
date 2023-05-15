import { useState } from "react";
import { loginService } from "../../Service/login";
import { SignUpService } from "../../Service/SignUp";

import styles from "./index.module.scss";

const LogingSignUp = () => {
    const [activeButton, setActiveButton] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [orgnanization, setOrganization] = useState("");

    const handleButtonClickToggle = (event: any) => {
        const id = event?.target?.id;
        setActiveButton(id);
    };

    const submitData = async () => {
        if (activeButton === "login") {
            const payload = {
                email: email,
                password: password,
            };
            try {
                const data: any = await loginService(payload);
                if (data?.status === "success") {
                    const token = data?.user;
                    localStorage.setItem("token", token);
                    window.location.href = "/dashboard";
                } else if (data?.status === "error") {
                    alert(data?.message);
                }
            } catch (err) {
                console.log(err);
                alert(err);
            }
        } else {
            const payload = {
                name: name,
                password: password,
                email: email,
                org: orgnanization,
            };
            try {
                const data: any = await SignUpService(payload);
                if (data?.status === "success") {
                    const token = data?.user;
                    localStorage.setItem("token", token);
                    window.location.href = "/dashboard";
                } else if (data?.status === "error") {
                    alert(data?.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const updateValues = (event: any) => {
        const id = event.target.id;
        const value = event.target.value;
        if (id === "email") {
            setEmail(value);
        } else if (id === "password") {
            setPassword(value);
        } else if (id === "name") {
            setName(value);
        } else if (id === "organization") {
            setOrganization(value);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {activeButton === "login" ? "Login" : "SignUp"}
            </div>
            <div className={styles.flex}>
                <button
                    id="login"
                    className={`${styles.button} ${
                        activeButton === "login" ? styles.active : ""
                    }`}
                    onClick={handleButtonClickToggle}
                >
                    Login
                </button>
                <button
                    id="signup"
                    className={`${styles.button} ${
                        activeButton === "signup" ? styles.active : ""
                    }`}
                    onClick={handleButtonClickToggle}
                >
                    SignUP
                </button>
            </div>
            <div className={styles.data_container}>
                {activeButton === "signup" ? (
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        required
                        onChange={updateValues}
                    />
                ) : null}
                <input
                    type="text"
                    id="email"
                    placeholder="Email Address"
                    required
                    onChange={updateValues}
                />
                {activeButton === "signup" ? (
                    <input
                        type="text"
                        id="organization"
                        placeholder="Orgnanization"
                        required
                        onChange={updateValues}
                    />
                ) : null}
                <input
                    type="text"
                    id="password"
                    placeholder="password"
                    required
                    onChange={updateValues}
                />
            </div>

            <button className={styles.loginSignUp} onClick={submitData}>
                {activeButton === "login" ? "Login" : "SignUp"}
            </button>
            {activeButton === "login" ? (
                <div className={styles.bottom_text}>
                    <span>Not a memeber? </span>
                    <a href="">SignUp now </a>
                </div>
            ) : null}
        </div>
    );
};

export default LogingSignUp;
