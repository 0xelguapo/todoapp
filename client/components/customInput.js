import { useReducer, useEffect } from "react";
import styles from "../styles/Input.module.css";
import { validate } from "../lib/validators.js";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return {
        state,
      };
  }
};

export default function CustomInput(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        className={styles.input}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
      />
    ) : (
      <textarea
        className={styles.textarea}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div className={styles.formDiv}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className={styles.errorText}>{props.errorText}</p>
      )}
    </div>
  );
}
