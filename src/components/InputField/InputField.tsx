import { InputFieldContext } from './InputField.context';

const InputField = () => {
  return (
    <InputFieldContext.Provider value={{ size: 'md', intent: 'default' }}>
      <input type="text" />
    </InputFieldContext.Provider>
  );
 
};

export default InputField;