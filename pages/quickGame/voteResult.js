import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "components/Layout";
import Spinner from "components/Spinner";
import Meta from "components/Meta";

export default function VoteResult(){
    const router = useRouter();

	const [windowUser, setWindowUser] = useState({});
	const [roomID, setRoomID] = useState("");

    const [voteResult, setVoteResults] = useState({
		state:"",
		paragraphs:[],
		time: 999,
		winner: 0
	})

    const [clock, setClock] = useState(0);
    const [isLast, setIsLast] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [checkNextVote, setCheckNextVote] = useState(true);
    const [turn, setTurn] = useState("");

    // Sava la info del usuario
	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			const queryParams = new URLSearchParams(window.location.search);
			setRoomID(queryParams.get("id"));
            setIsLast(queryParams.get("last") == "true")
            setTurn(queryParams.get("turn"))

			const username = localStorage.getItem("username");
			const password = localStorage.getItem("password");
			const picture = localStorage.getItem("picture");
			const coins = localStorage.getItem("coins");
			const stars = localStorage.getItem("stars");

			setWindowUser({
				username: username,
				password: password,
				picture: picture,
				coins: coins,
				stars: stars,
			});

			setCheckNextVote(true)
		} else {
			router.push("/login");
		}
	}, []);

    	// Hace fetch de la api de ver mejor parrafo
	useEffect(() => {
		// Función que llama a la api
		if (!windowUser.username || !roomID || !turn) {
			return;
		}

		const getData = async () => {
			// Opciones para llamar a la api
			const info = {
				username: windowUser.username,
				password: windowUser.password,
				turn: turn,
				id: "#" + roomID,
			};
			
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(info),
			};

			console.log("ENVÍO: ", info)

            /*
                DEBUG FROM HERE
            
            setVoteResults({
                state: "success",
                paragraphs: [
                    {
						body: "1- asd asda sdasdasd ",
						username: "pepino",
					},
                    {
						body: "2- asd asda sdasdasd ",
						username: "jamon",
					},
                    {
						body: "3- asd asda sdasdasd ",
						username: "chorizo",
					},
                    {
						body: "1- asd asda sdasdasd ",
						username: "pepino",
					},
                    {
						body: "2- asd asda sdasdasd ",
						username: "jamon",
					},
                    {
						body: "1- asd asda sdasdasd ",
						username: "pepino",
					},
                    {
						body: "2- asd asda sdasdasd ",
						username: "jamon",
					},
                    {
						body: "1- asd asda sdasdasd ",
						username: "pepino",
					},
                    {
						body: "2- asd asda sdasdasd ",
						username: "jamon",
					},
                    {
						body: "1- asd asda sdasdasd ",
						username: "pepino",
					},
                    {
						body: "2- asd asda sdasdasd ",
						username: "jamon",
					}
                ],
                time: 90,
                winner: 1
            })
            return
            
                TO HERE
            */

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/quick_game/resume_voted_quick_game`,
				options
			);
			
			if(!res.ok){
				console.log("error responose: ", res)
				return;
			}

			const data = await res.json();

			console.log(data)

			// Si no ha ido bien o no estoy logeado volvemos a /
			if (data.result == "error") {
				console.log(data);
				alert("Error al obtener datos votacion");
				router.push("/quickGame");
				return;
			}

			if(data.result == "waiting_players"){
				setVoteResults({
					state:"waiting_players",
                    paragraphs:[],
                    time: 999,
                    winner: 0
				})
			
			}else{
	
				// Llama al hook que almacena la información de la partida
				setVoteResults({
					state: data.result,
                    paragraphs: data.paragraphs,
                    time: data.s,
                    winner: data.winner
				})
			}			
		};

		getData();
	}, [windowUser, roomID, turn, refresh, router]);

    // Controla  el tiempo máximo para visualizar el resultado
	useEffect(() => {
		const start = new Date();

		const interval = setInterval(() => {
			if (voteResult.state == "waiting_players" || voteResult.state == "") {
				return;
			}

			const now = new Date();
			const difference = now.getTime() - start.getTime();

			const s = Math.floor(difference / 1000);
			const tiempo = 10 - s < 0 ? 0 : 10 - s;
			setClock(tiempo);

			if (tiempo == 0) {
                if(isLast){
                    router.push(`/quickGame/results?id=${roomID}`)
                }else{
                    router.push(`/quickGame/vote?id=${roomID}`)
                }
            }
		}, 1000);

		return () => clearInterval(interval);
	}, [roomID, voteResult, router]);
    
    // Controla la espera de jugadores
	useEffect(() => {
		const interval = setInterval(() => {
		    console.log("Check Continuo");
            if (voteResult.state == "waiting_players") {
                console.log("tengo que checkear el paso de turno");
                setRefresh(!refresh);
            }
		}, 1000);

		return () => clearInterval(interval);
	}, [voteResult]);

	// Si tadavía no hoy usuario, esperamos a que lo haya
	if (!windowUser || voteResult.state == "") {
        console.log("USER: ", windowUser)
		console.log("STORY: ", voteResult)
		return <Spinner showLayout={true} />;
	}

    const layoutInfo = {
		username: windowUser.username,
		stars: windowUser.stars,
		coins: windowUser.coins,
		image_ID: windowUser.picture
	};

    return(
        <Layout data={layoutInfo} inGame={true}>
            <Meta title="Resultados de Votación" />
            <div className="flex flex-col justify-center w-full items-center mb-20">
                <div className="commonTitle">Votaciones</div>
                {voteResult.paragraphs.length > 0 ? (
                    <>
                        <div className="commonSubtitle">Historia de {voteResult.paragraphs[0].username}</div>
                        <div className="flex flex-row space-x-5 p-10 justify-center w-full items-center flex-wrap">
                            {voteResult.paragraphs.map((parrafo, index)=>{                      
                                const bg = index == voteResult.winner ? "bg-verde_parrafo_seleccionado" : "bg-verde_parrafo"
                                return (
                                <div key={index} className="flex flex-col space-y-1 pb-10">
                                    <div className="flex flex-row">
                                        {index == voteResult.winner?(
                                            <Image 
                                                src="/icons/crown.png" 
                                                width={20} 
                                                height={20} 
                                                alt="WINNER"
                                            />    
                                        ):(
                                            <></>
                                        )}                                
                                        <div className="font-graduate">Escrito por {parrafo.username}</div>
                                    </div>
                                    
                                    <div className={`${bg} p-2 text-white font-arial-b`}>
                                        {parrafo.body}
                                    </div>
                                </div>)
                            })}
                        </div>
                    </>
                ):(
                    <></>
                )}
                
                <div className="text-2xl font-bangers">
                    {clock} seconds left until next vote
                </div>

                {voteResult.state == "waiting_players" ? (
                    <div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white">
                        Esperando al resto de jugadores
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </Layout>
    )
}