import Image from "next/image";

export default function ListOfPeople({ data, showFaces }) {
	return (
		<div className="flex flex-col space-y-4 ">
			{data.map((person, index) => (
				<PersonInfo
					key={index}
					person={person}
					index={index}
					faces={showFaces}
				/>
			))}
		</div>
	);
}

function PersonInfo({ person, index, faces }) {
	const image = `/profPic/icon${person.picture}.png`;
	return (
		<div className="flex flex-row h-full justify-between items-center bg-gray-200 px-2 rounded-lg hover:scale-105">
			<div className="flex flex-row">
				{faces ? (
					<>
						<Image src={image} width="38" height="38" />
						<div className="w-5" />
					</>
				) : (
					<>
						<h1 className="font-graduate w-auto xl:text-3xl text-sm text-verde_letras font-bold">
							{index + 1}º
						</h1>
						{index == 0 ? (
							<>
								<Image
									src="/icons/crown.png"
									width="38"
									height="38"
								/>
								<div className="w-5" />
							</>
						) : (
							<>
								<div className="w-[38px]" />
								<div className="w-5" />
							</>
						)}
					</>
				)}
				<h1 className="font-graduate xl:w-32 w-10 xl:text-2xl text-sm text-verde_letras">
					{person.username}
				</h1>
			</div>

			<div className="flex flex-row items-center space-x-4">
				<h1 className="font-graduate pl-24 xl:text-2xl text-sm text-verde_letras text-right">
					x {person.stars}
				</h1>
				<div>
					<Image src="/icons/star.png" width="50" height="50" />
				</div>
			</div>
		</div>
	);
}
