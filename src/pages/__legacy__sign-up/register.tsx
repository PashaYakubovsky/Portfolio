// import { useId, useState } from "react";

// import style from "./register.module.scss";
// import { FormGroup } from "@mui/material";
// import { useUser } from "../../cache/user";

// export default () => {
//     const rememberMeId = useId();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [rememberMe, setRememberMe] = useState(false);
//     const [registerError, setRegisterError] = useState(null);
//     const [, { register }] = useUser();

//     return (
//         <form
//             className={style.cForm}
//             onSubmit={(event) => {
//                 event.preventDefault();

//                 register(email, password, rememberMe).then(() => {
//                     setEmail("");
//                     setPassword("");
//                     setRememberMe(false);
//                     setRegisterError(null);
//                 }, setRegisterError);
//             }}
//         >
//             <FormGroup title="Please register">
//                 {/* <FormField> */}
//                 <input
//                     type="email"
//                     placeholder=" "
//                     value={email}
//                     onChange={({ currentTarget }) => {
//                         setRegisterError(null);
//                         setEmail(currentTarget.value);
//                     }}
//                 />
//                 <label>Email address</label>
//                 {/* </FormField> */}
//                 {/* <FormField> */}
//                 <input
//                     type="password"
//                     placeholder=" "
//                     value={password}
//                     onChange={({ currentTarget }) => {
//                         setRegisterError(null);
//                         setPassword(currentTarget.value);
//                     }}
//                 />
//                 <label>Password</label>
//                 {/* </FormField> */}
//             </FormGroup>

//             {/* <FormGroup> */}
//             <input
//                 type="checkbox"
//                 id={rememberMeId}
//                 className={style.cFormRememberMeCheckbox}
//                 checked={rememberMe}
//                 onChange={({ currentTarget }) =>
//                     setRememberMe(currentTarget.checked)
//                 }
//             />
//             <label htmlFor={rememberMeId}>Remember me</label>
//             {/* </FormGroup> */}

//             {registerError ? (
//                 <p className={style.cErrorMessage}>
//                     A user exists already. You may login.
//                 </p>
//             ) : null}

//             <button type="submit" className={style.cFormRegisterButton}>
//                 Register
//             </button>
//         </form>
//     );
// };
