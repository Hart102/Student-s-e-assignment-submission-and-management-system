const Form_btn = ({btnText, onclick}) => {
  return (
    <div className="px-4">
      <button className="btn btn-block font-weight-bold py-3 text-uppercase text-white" onClick={onclick}>{btnText}</button>
    </div>
  )
}

export default Form_btn