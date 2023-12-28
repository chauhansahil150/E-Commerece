const Button=(props)=>{
    return(
      <button
      style={{
        backgroundColor:"black",
        color:'white',
        width:'fit-content',
        padding:'5px',
        margin:'5px',
      }}
      onClick={props.onClick}
      >{props.name}</button>
    )
}
export default Button;