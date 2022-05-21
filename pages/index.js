import Layout from "components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		if (localStorage.getItem("logged") == "si") {
			router.push("/profile");
		}
	}, [router]);

	return (
		<Layout noInfo={true}>
			<Meta title="¡Únete y juega!" />
			<div className="background">
				<div className="flex flex-col items-center justify-center w-full space-y-6 mt-24">
					<img
						className="w-1/3"
						src={"/frankenstory.png"}
						alt={"LOGO"}
					/>
					<img src={"/placeholder.gif"} alt={"LOGO"} />
					<div className="flex space-x-10">
						<button
							className="commonButton bg-verde_top hover:bg-emerald-600 w-60"
							type="submit"
							onClick={() => router.push("/login")}
						>
							Iniciar sesión
						</button>

						<button
							className="commonButton bg-verde_top hover:bg-emerald-600 w-60"
							type="submit"
							onClick={() => router.push("/register")}
						>
							Crear cuenta
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
