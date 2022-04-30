import { useState, useEffect } from "react"

export default function SeeTale() {
    const [story, setStory] = useState("")
    const url = "http://localhost:3000/api/general/watch_story"
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title')
    const id = queryParams.get('id')
    const type = queryParams.get('type')

    useEffect (()=>{
        const getData = async () =>{
            const data = {
                username:localStorage.getItem("username"),
                password:localStorage.getItem("password"),
                id:parseInt(id),
                type:type
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
            setStory(res)
        }
        getData()
    },[])

    if(!story){
        return(<div className="background">loading...</div>)
    }

    return(
        <div className="storyBox">
            <div className="titleWrite">{title}</div>
            <div className="savedStory max-h-full text-xl">{story.body}</div>
        </div>
    )
}