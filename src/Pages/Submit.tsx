import "@fontsource/montserrat";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
export default function Submit(){

    return (
        <div className="h-screen font-montserrat h-screen py-6 text-gray-200  px-3 sm:px-10 flex flex-col items-center" style={{backgroundImage:'linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)'}}>
            <div>

            <h1 className="text-center  text-8xl  font-extrabold tracking-wide  leading-tight translate-y-11 text-transparent bg-clip-text bg-gradient-to-r from-purple-500
        to-orange-500 leading-loose">COMPLETED</h1>
        </div>

        <div className="flex justify-between w-4/6 text-3xl font-bold">
        <div >
            <h3 className="">SCORE</h3>
            <h3></h3>
            <h3 className="text-lg font-medium">TOTAL QUESTION</h3>
            <h3 className="text-lg font-medium">ATTEMPTED</h3>
            <h3 className="text-lg font-medium">NOT ATTEMPETED</h3>
        </div>
            <h3>Analytics</h3>
        </div>
        </div>
    )
}