import AnimatedTitle from './AnimatedTitle'
import Button from './Button'

const ImageClipBox = ({ src, className }) => {
	return (
		<div className={className}>
			<img src={src} alt="image" />
		</div>
	)
}

const Contact = () => {
	return (
		<section id="contact" className="my-20 min-h-96 w-screen px-10">
			<div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
				<div className="absolute flex-col justify-between top-0 hidden h-full w-72 overflow-hidden md:flex lg:left-0 lg:w-96">
					<ImageClipBox
						src="img/contact-1.webp"
						className="contact-clip-path-1"
					/>
					<ImageClipBox
						src="img/contact-2.webp"
						className="contact-clip-path-2 "
					/>
				</div>

				<div className="absolute -top-40 left-1/2 -translate-x-1/2 w-60 sm:top-1/2 sm:left-20 md:translate-x-0 md:left-auto md:right-10 lg:top-20 lg:w-80">
					<ImageClipBox
						src="img/swordman-partial.webp"
						className="absolute md:scale-125"
					/>
					<ImageClipBox
						src="img/swordman.webp"
						className="sword-man-clip-path md:scale-125"
					/>
				</div>

				<div className="flex flex-col items-center text-center">
					<p className="font-general text-[10px] uppercase">Join Zentry</p>
					<AnimatedTitle
						title="Let's b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether"
						className="mt-10 w-full text-5xl leading-[0.9] md:text-6xl lg:text-7xl xl:text-8xl"
					/>

					<Button title="contact us" className="cursor-pointer mt-10" />
				</div>
			</div>
		</section>
	)
}

export default Contact
