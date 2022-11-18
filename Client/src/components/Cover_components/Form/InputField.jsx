
const InputField = ({type, placeholder, onchange}) => {
  return (
    <div className="my-4 text-white">
      <input type={type} className="form-control py-3 px-4 shadow-sm" placeholder={placeholder} onChange={onchange}/>
    </div>  
  )
}

export default InputField