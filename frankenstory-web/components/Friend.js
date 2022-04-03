export default function Friend({name,friend}){
    return(
        <div class="friend">
            <h1>{name} {friend ? "+" : "-"}</h1>
        </div>
    )
}

Friend.defaultProps = {
    name:"Benito",
    friend: true
}