
export default function StatusComment({ following, owner, userId }) {
    if (userId === owner) {
        return (
           <p>• post’s author</p>
        )
    }else if(following.includes(userId)){
    return (
        <p>• following</p>
     )
  }else{
      return(
          <></>
      )
  }
  
}