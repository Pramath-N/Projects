import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

function HomePage() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
        <h1 className='text-5xl font-bold tracking-right text-orange-600'>
            Tuck into takeaway today with MERNEats
        </h1>

        <span className='text-xl'>
            Food is just a click away!
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage}/>
        <div className="flex flex-col items-center justify-center gap-5 text-center">
            <span className="font-bold text-3xl tracking-tighter">
                Order Takeaway even faster
            </span>
            <span>
                Download MERNEats app for free for faster oedering and personalized reccomendations
            </span>
            <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
