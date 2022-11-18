const Overviewbox = ({text, overview}) => {
  return (
    <div className="box shadow-sm d-flex flex-column text-center justify-content-center py-4 px-2 pointer text-white1 font-weight-bold">{text} <b>{overview}</b></div>
  )
}

export default Overviewbox