import Image from "next/image";

type Props = {
  name: string;
  studio: string;
  icon: string;
};

export default function GameHeader(props: Props) {
  const { name, studio, icon } = props;

  return (
    <header className="flex w-full gap-x-4">
      <figure className="game-icon">
        <Image
          width={256}
          height={256}
          src={icon}
          alt=""
          className="object size-20 rounded-lg object-cover lg:size-32"
        />
      </figure>
      <div className="font-ludus-pixelify-sans flex flex-col justify-center text-white">
        <h2 className="text-2xl lg:text-5xl">{name}</h2>
        <h3 className="text-md text-gray-300 lg:text-2xl">{studio}</h3>
        <div className="flex gap-x-2 text-gray-300 lg:text-xl">
          <i className="bi bi-windows"></i>
          <i className="bi bi-apple"></i>
        </div>
      </div>
    </header>
  );
}
