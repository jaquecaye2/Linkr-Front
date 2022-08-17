
export default function StatusComment({ following, owner, userId }) {
    let arr = []
     following.map((e)=>{
      arr.push( e.seguindo)
    })

    if (userId === owner) {
        return (
           <p>• post’s author</p>
        )
    }else if(arr.includes(userId)){
    return (
        <p>• following</p>
     )
  }else{
      return(
          <></>
      )
  }
  
}