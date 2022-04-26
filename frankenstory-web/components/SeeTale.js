import { useEffect } from "react"

export default function SeeTale() {

    const url = "http://localhost:3000/api/general/watch_story"
    var title = "Titulo"
    var textBody = "Parrafo"

    useEffect (()=>{
        const getData = async () =>{
            const data = {
                username:localStorage.getItem("username"),
                password:localStorage.getItem("password"),
                id:1,
                type:"tale"
            }
            var options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify(data)
            }
            var res = await fetch(url,options)
            res = await res.json()
            textBody = res.body
        }
        getData()
    },[])

    return(
        <div className="storyBox">
            <div className="titleWrite franken">{title}</div>
            <div className="savedStory max-h-full">{textBody}</div>
        </div>
    )
}