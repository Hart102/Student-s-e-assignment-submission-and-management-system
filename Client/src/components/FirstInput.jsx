const FirstInput = ({ label, onchange, id }) => {
  return (
    <div className='font-weight-bold text-uppercase d-flex align-items-center my-3'>
      <label className='col-md-3'>{label}</label>
      <input type="text" className='form-control col-md-51' onChange={onchange} id={id}/>
    </div>
  )
}

export default FirstInput