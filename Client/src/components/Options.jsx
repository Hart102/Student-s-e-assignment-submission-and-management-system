
const Options = ({ value, placeholder, id }) => {
  return (
    <div className='my-3 col-md-12'>
      <input type="text" className="form-control py-2" placeholder={placeholder} onChange={value} id={id}/>
    </div>
  )
}

export default Options