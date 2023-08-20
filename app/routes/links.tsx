import { Icon } from "~/components/icon";
import atticusAndMe from "~/images/atticus-and-me.png";

export default function Links() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-blue-950 py-16 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="min-h-fit min-w-fit">
          <div className="aspect-square h-48 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 p-1 shadow-sm">
            <img
              alt="Atticus and Me"
              className="aspect-square h-full rounded-full object-cover"
              src={atticusAndMe}
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="max-w-fit bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
            Aydrian Howard
          </h1>
          <h2 className="text-xl font-semibold">Hoosier in the Big City</h2>
          <h3 className="text-sm font-light">Corgi Dad · Uncle · Nerd</h3>
        </div>
        <nav className="flex flex-col gap-4 text-center text-lg">
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://itsaydrian.com"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="home" />{" "}
            ItsAydrian.com
          </a>
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://twitter.com/itsaydrian"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="twitter" />{" "}
            Twitter
          </a>
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://instagram.com/itsaydrian"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="instagram" />{" "}
            Instagram
          </a>
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://twitch.com/itsaydrian"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="twitch" /> Twitch
          </a>
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://github.com/aydrian"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="github" /> GitHub
          </a>
          <a
            className="rounded-sm border border-green-500 px-8 py-4 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500"
            href="https://www.linkedin.com/in/aydrian/"
          >
            <Icon className="mr-1 inline-block h-6 w-6" name="linkedin" />{" "}
            LinkedIn
          </a>
        </nav>
      </div>
    </div>
  );
}
